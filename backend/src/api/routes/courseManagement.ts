import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateAdmin } from '../middleware/auth';
import type { Course } from '../../types/course';

const router = Router();
const prisma = new PrismaClient();

interface CourseCreateBody extends Omit<Course, 'id' | 'createdAt' | 'updatedAt'> {}

// Create a new course
router.post('/courses', authenticateAdmin, (req: Request, res: Response) => {
  const createCourse = async () => {
    try {
      const courseData: CourseCreateBody = req.body;
      const course = await prisma.course.create({
        data: {
          ...courseData,
          modules: {
            create: courseData.modules.map((module: any) => ({
              ...module,
              steps: {
                create: module.steps.map((step: any) => ({
                  ...step,
                  quiz: step.quiz ? {
                    create: {
                      ...step.quiz,
                      questions: {
                        create: step.quiz.questions
                      }
                    }
                  } : undefined
                }))
              }
            }))
          }
        },
        include: {
          modules: {
            include: {
              steps: {
                include: {
                  quiz: {
                    include: {
                      questions: true
                    }
                  }
                }
              }
            }
          }
        }
      });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create course' });
    }
  };
  createCourse();
});

// Get all courses
router.get('/courses', (_req: Request, res: Response) => {
  const getCourses = async () => {
    try {
      const courses = await prisma.course.findMany({
        include: {
          modules: {
            include: {
              steps: {
                include: {
                  quiz: {
                    include: {
                      questions: true
                    }
                  }
                }
              }
            }
          }
        }
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  };
  getCourses();
});

// Update a course
router.put('/courses/:id', authenticateAdmin, (req: Request, res: Response) => {
  const updateCourse = async () => {
    try {
      const { id } = req.params;
      const courseData = req.body;
      
      // Delete existing relations
      await prisma.question.deleteMany({
        where: { quiz: { step: { module: { courseId: id } } } }
      });
      await prisma.quiz.deleteMany({
        where: { step: { module: { courseId: id } } }
      });
      await prisma.step.deleteMany({
        where: { module: { courseId: id } }
      });
      await prisma.module.deleteMany({
        where: { courseId: id }
      });

      // Create new course data
      const course = await prisma.course.update({
        where: { id },
        data: {
          ...courseData,
          modules: {
            create: courseData.modules.map((module: any) => ({
              ...module,
              steps: {
                create: module.steps.map((step: any) => ({
                  ...step,
                  quiz: step.quiz ? {
                    create: {
                      ...step.quiz,
                      questions: {
                        create: step.quiz.questions
                      }
                    }
                  } : undefined
                }))
              }
            }))
          }
        },
        include: {
          modules: {
            include: {
              steps: {
                include: {
                  quiz: {
                    include: {
                      questions: true
                    }
                  }
                }
              }
            }
          }
        }
      });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update course' });
    }
  };
  updateCourse();
});

// Delete a course
router.delete('/courses/:id', authenticateAdmin, (req: Request, res: Response) => {
  const deleteCourse = async () => {
    try {
      const { id } = req.params;
      await prisma.course.delete({
        where: { id }
      });
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete course' });
    }
  };
  deleteCourse();
});

export default router;
