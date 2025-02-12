import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface CourseSection {
  id: string;
  title: string;
  content: string;
  order: number;
  resources: SectionResource[];
}

interface SectionResource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'quiz';
  url: string;
}

interface CourseData {
  title: string;
  description: string;
  imageUrl?: string;
  sections: CourseSection[];
}

const CourseEditor: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const isNewCourse = !courseId;

  const [formData, setFormData] = useState<CourseData>({
    title: '',
    description: '',
    imageUrl: '',
    sections: [],
  });

  const [isLoading, setIsLoading] = useState(courseId ? true : false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError('Failed to fetch course');
      console.error('Error fetching course:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    const newSections = [...formData.sections];
    newSections[index] = {
      ...newSections[index],
      [field]: value,
    };
    setFormData({ ...formData, sections: newSections });
  };

  const addSection = () => {
    const newSection: CourseSection = {
      id: Date.now().toString(), // Temporary ID
      title: '',
      content: '',
      order: formData.sections.length,
      resources: [],
    };
    setFormData({
      ...formData,
      sections: [...formData.sections, newSection],
    });
  };

  const removeSection = (index: number) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const addResource = (sectionIndex: number) => {
    const newResource: SectionResource = {
      id: Date.now().toString(), // Temporary ID
      title: '',
      type: 'document',
      url: '',
    };
    const newSections = [...formData.sections];
    newSections[sectionIndex].resources.push(newResource);
    setFormData({ ...formData, sections: newSections });
  };

  const handleResourceChange = (
    sectionIndex: number,
    resourceIndex: number,
    field: string,
    value: string
  ) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].resources[resourceIndex] = {
      ...newSections[sectionIndex].resources[resourceIndex],
      [field]: value,
    };
    setFormData({ ...formData, sections: newSections });
  };

  const removeResource = (sectionIndex: number, resourceIndex: number) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].resources.splice(resourceIndex, 1);
    setFormData({ ...formData, sections: newSections });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isNewCourse
        ? 'http://localhost:5000/api/courses'
        : `http://localhost:5000/api/courses/${courseId}`;
      const method = isNewCourse ? 'POST' : 'PUT';

      // TODO: Replace with actual API call
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save course');
      }

      navigate('/admin/courses');
    } catch (err) {
      setError('Failed to save course');
      console.error('Error saving course:', err);
    }
  };

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading course...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isNewCourse ? 'Create New Course' : 'Edit Course'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Course Sections</h2>
            <button
              type="button"
              onClick={addSection}
              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded hover:bg-indigo-200"
            >
              Add Section
            </button>
          </div>

          <div className="space-y-6">
            {formData.sections.map((section, sectionIndex) => (
              <div
                key={section.id}
                className="border rounded-lg p-4 space-y-4 bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) =>
                          handleSectionChange(sectionIndex, 'title', e.target.value)
                        }
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Content
                      </label>
                      <textarea
                        value={section.content}
                        onChange={(e) =>
                          handleSectionChange(sectionIndex, 'content', e.target.value)
                        }
                        rows={4}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Resources
                        </label>
                        <button
                          type="button"
                          onClick={() => addResource(sectionIndex)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          Add Resource
                        </button>
                      </div>

                      <div className="space-y-2">
                        {section.resources.map((resource, resourceIndex) => (
                          <div
                            key={resource.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="text"
                              value={resource.title}
                              onChange={(e) =>
                                handleResourceChange(
                                  sectionIndex,
                                  resourceIndex,
                                  'title',
                                  e.target.value
                                )
                              }
                              placeholder="Resource title"
                              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <select
                              value={resource.type}
                              onChange={(e) =>
                                handleResourceChange(
                                  sectionIndex,
                                  resourceIndex,
                                  'type',
                                  e.target.value
                                )
                              }
                              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                              <option value="document">Document</option>
                              <option value="video">Video</option>
                              <option value="quiz">Quiz</option>
                            </select>
                            <input
                              type="url"
                              value={resource.url}
                              onChange={(e) =>
                                handleResourceChange(
                                  sectionIndex,
                                  resourceIndex,
                                  'url',
                                  e.target.value
                                )
                              }
                              placeholder="Resource URL"
                              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeResource(sectionIndex, resourceIndex)
                              }
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove Section
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/admin/courses')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isNewCourse ? 'Create Course' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseEditor;
