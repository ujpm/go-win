import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'kin' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    courses: 'Courses',
    practiceTest: 'Practice Test',
    resources: 'Resources',
    progress: 'Progress',
    profile: 'Profile',
    adminDashboard: 'Admin Dashboard',
    manageCourses: 'Manage Courses',
    manageResources: 'Manage Resources',
    help: 'Help',
    settings: 'Settings',
    
    // Auth
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    
    // Practice Test
    page: 'Page',
    of: 'of',
    submit: 'Submit',
    retake: 'Retake',
    testComplete: 'Test Complete!',
    correctAnswers: 'Correct Answers',
    selectLanguage: 'Select Language',
    next: 'Next',
    previous: 'Previous',
    
    // Home Page
    welcomeTitle: 'Welcome to Driving License Test Preparation',
    welcomeSubtitle: 'Your path to becoming a confident and safe driver',
    startLearning: 'Start Learning',
    featuresTitle: 'What We Offer',
    feature1Title: 'Interactive Learning',
    feature1Desc: 'Engaging lessons and visual aids',
    feature2Title: 'Practice Tests',
    feature2Desc: 'Realistic test simulations',
    feature3Title: 'Progress Tracking',
    feature3Desc: 'Monitor your improvement',
    newFeature: 'New Feature',
    interactivePracticeTests: 'Interactive Practice Tests',
    masterYour: 'Master Your',
    drivingTheory: 'Driving Theory',
    withConfidence: 'with Confidence',
    comprehensiveLearningPlatform: 'Comprehensive learning platform designed to help you ace your driving theory test. Interactive lessons, practice tests, and real-time progress tracking.',
    learnMore: 'Learn more',
    learnFaster: 'Learn Faster',
    everythingYouNeed: 'Everything you need to pass your test',
    comprehensiveCourses: 'Comprehensive Courses',
    accessWideRangeOfCourses: 'Access a wide range of courses covering all aspects of driving theory.',
    testYourKnowledge: 'Test your knowledge with our extensive collection of practice tests.',
    monitorYourLearningProgress: 'Monitor your learning progress and identify areas for improvement.',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'Something went wrong',
    success: 'Operation successful',
    confirm: 'Confirm'
  },
  kin: {
    // Navigation
    home: 'Ahabanza',
    about: 'Abo turibo',
    courses: 'Amasomo',
    practiceTest: 'Isuzuma bumenyi',
    resources: 'Ibikoresho',
    progress: 'Iterambere',
    profile: 'Umwirondoro',
    adminDashboard: 'Ubuyobozi',
    manageCourses: 'Gucunga amasomo',
    manageResources: 'Gucunga ibikoresho',
    help: 'Ubufasha',
    settings: 'Igenamiterere',
    
    // Auth
    login: 'Kwinjira',
    register: 'Kwiyandikisha',
    logout: 'Gusohoka',
    email: 'Imeyili',
    password: 'Ijambo ryibanga',
    confirmPassword: 'Emeza ijambo ryibanga',
    forgotPassword: 'Wibagiwe ijambo ryibanga?',
    createAccount: 'Kora konti',
    alreadyHaveAccount: 'Usanzwe ufite konti?',
    dontHaveAccount: 'Nta konti ufite?',
    
    // Practice Test
    page: 'Ipaji',
    of: 'kuri',
    submit: 'Ohereza ibisubizo',
    retake: 'Subiramo isuzuma',
    testComplete: 'Isuzuma ryarangiye!',
    correctAnswers: 'Wakoze neza ibibazo',
    selectLanguage: 'Hitamo ururimi',
    next: 'Komeza',
    previous: 'Gusubira inyuma',
    
    // Courses
    myCourses: 'Amasomo yanjye',
    allCourses: 'Amasomo yose',
    startCourse: 'Tangira isomo',
    continueCourse: 'Komeza isomo',
    courseProgress: 'Iterambere ryisomo',
    lessonProgress: 'Iterambere ryisomo',
    completed: 'Byarangiye',
    
    // Admin
    users: 'Abakoresha',
    analytics: 'Imibare',
    reports: 'Raporo',
    addCourse: 'Ongeramo isomo',
    editCourse: 'Hindura isomo',
    deleteCourse: 'Siba isomo',
    
    // Home Page
    welcomeTitle: 'Murakaza neza mu isuzuma ryo gutwara ibinyabiziga',
    welcomeSubtitle: 'Inzira yawe yo kuba umushoferi w\'umuhanga kandi w\'umutekano',
    startLearning: 'Tangira kwiga',
    featuresTitle: 'Ibyo dutanga',
    feature1Title: 'Kwiga mu buryo bwuguruye',
    feature1Desc: 'Amasomo n\'ibikoresho bifatika',
    feature2Title: 'Isuzuma bumenyi',
    feature2Desc: 'Isuzuma ryihariye',
    feature3Title: 'Gukurikirana iterambere',
    feature3Desc: 'Kugenzura iterambere ryawe',
    newFeature: 'Ikintu gishya',
    interactivePracticeTests: 'Isuzuma rishya',
    masterYour: 'Menya neza',
    drivingTheory: 'Amategeko y\'umuhanda',
    withConfidence: 'ufite icyizere',
    comprehensiveLearningPlatform: 'Uburyo bwo kwiga bukoresha ikoranabuhanga bugufasha gutsinda isuzuma ry\'amategeko y\'umuhanda. Amasomo, isuzuma, no gukurikirana iterambere ryawe.',
    learnMore: 'Menya byinshi',
    learnFaster: 'Iga vuba',
    everythingYouNeed: 'Ibyo ukeneye byose kugira ngo utsinde isuzuma',
    comprehensiveCourses: 'Amasomo yuzuye',
    accessWideRangeOfCourses: 'Amasomo menshi akubiyemo ibice byose by\'amategeko y\'umuhanda.',
    testYourKnowledge: 'Suzuma ubumenyi bwawe ukoresheje isuzuma ryacu.',
    monitorYourLearningProgress: 'Kurikirana iterambere ryawe kandi umenye aho ugomba kunoza.',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À propos',
    courses: 'Cours',
    practiceTest: 'Test de pratique',
    resources: 'Ressources',
    progress: 'Progrès',
    profile: 'Profil',
    adminDashboard: 'Tableau de bord',
    manageCourses: 'Gérer les cours',
    manageResources: 'Gérer les ressources',
    help: 'Aide',
    settings: 'Paramètres',
    
    // Auth
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    createAccount: 'Créer un compte',
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    dontHaveAccount: 'Vous n\'avez pas de compte?',
    
    // Practice Test
    page: 'Page',
    of: 'sur',
    submit: 'Soumettre',
    retake: 'Reprendre',
    testComplete: 'Test terminé!',
    correctAnswers: 'Bonnes réponses',
    selectLanguage: 'Choisir la langue',
    next: 'Suivant',
    previous: 'Précédent',
    
    // Courses
    myCourses: 'Mes cours',
    allCourses: 'Tous les cours',
    startCourse: 'Commencer le cours',
    continueCourse: 'Continuer le cours',
    courseProgress: 'Progrès du cours',
    lessonProgress: 'Progrès de la leçon',
    completed: 'Terminé',
    
    // Admin
    users: 'Utilisateurs',
    analytics: 'Analytiques',
    reports: 'Rapports',
    addCourse: 'Ajouter un cours',
    editCourse: 'Modifier le cours',
    deleteCourse: 'Supprimer le cours',
    
    // Home Page
    welcomeTitle: 'Bienvenue à la préparation du permis de conduire',
    welcomeSubtitle: 'Votre chemin vers un conducteur confiant et sûr',
    startLearning: 'Commencer à apprendre',
    featuresTitle: 'Ce que nous offrons',
    feature1Title: 'Apprentissage interactif',
    feature1Desc: 'Leçons engageantes et supports visuels',
    feature2Title: 'Tests de pratique',
    feature2Desc: 'Simulations de test réalistes',
    feature3Title: 'Suivi des progrès',
    feature3Desc: 'Surveillez votre amélioration',
    newFeature: 'Nouvelle fonctionnalité',
    interactivePracticeTests: 'Tests de pratique interactifs',
    masterYour: 'Maîtrisez votre',
    drivingTheory: 'Code de la route',
    withConfidence: 'avec confiance',
    comprehensiveLearningPlatform: 'Plateforme d\'apprentissage complète conçue pour vous aider à réussir votre examen du code de la route. Leçons interactives, tests de pratique et suivi des progrès en temps réel.',
    learnMore: 'En savoir plus',
    learnFaster: 'Apprenez plus vite',
    everythingYouNeed: 'Tout ce dont vous avez besoin pour réussir votre test',
    comprehensiveCourses: 'Cours complets',
    accessWideRangeOfCourses: 'Accédez à une large gamme de cours couvrant tous les aspects du code de la route.',
    testYourKnowledge: 'Testez vos connaissances avec notre collection complète de tests.',
    monitorYourLearningProgress: 'Suivez vos progrès d\'apprentissage et identifiez les domaines à améliorer.',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
