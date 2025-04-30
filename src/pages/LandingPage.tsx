
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Award, 
  Mic, 
  Calendar, 
  BarChart, 
  UserRound, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/5c8491f6-a38b-4ec4-acd7-f60122594862.png" 
              alt="OrthoBoost Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-xl">OrthoBoost</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary">Fonctionnalités</a>
            <a href="#how-it-works" className="text-sm hover:text-primary">Comment ça marche</a>
            <a href="#testimonials" className="text-sm hover:text-primary">Témoignages</a>
          </nav>
          <div>
            <Link to="/login">
              <Button variant="ghost" className="mr-2">Se connecter</Button>
            </Link>
            <Link to="/contact">
              <Button>Nous contacter</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-therapy-light to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                L'Orthophonie Rendue <span className="text-therapy-purple">Amusante</span> et <span className="text-therapy-blue">Efficace</span>
              </h1>
              <p className="text-lg mb-8 text-gray-700">
                Notre plateforme ludique aide les enfants à améliorer leurs compétences en orthophonie grâce à des exercices engageants tout en donnant aux thérapeutes les outils pour suivre efficacement leurs progrès.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="rounded-full">
                    <span>Commencer</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" size="lg" className="rounded-full">
                    En savoir plus
                  </Button>
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-therapy-purple/10 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-therapy-blue/10 rounded-full z-0"></div>
                <div className="relative z-10 bg-white p-4 rounded-xl shadow-lg">
                  <img 
                    src="/lovable-uploads/09860b05-c1dd-41f6-8ed7-5e885aed7ef5.png" 
                    alt="Enfant utilisant OrthoBoost" 
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white p-3 rounded-xl shadow-lg animate-float">
                  <Award className="text-therapy-orange h-8 w-8" />
                </div>
                <div className="absolute top-1/4 -left-8 transform -translate-y-1/2 bg-white p-3 rounded-xl shadow-lg animate-float" style={{animationDelay: '0.5s'}}>
                  <Mic className="text-therapy-purple h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Des Fonctionnalités Puissantes pour Tous</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Notre plateforme est conçue pour répondre aux besoins des thérapeutes, des patients et des administrateurs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-therapy-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24 Exercices Interactifs</h3>
              <p className="text-gray-600">
                Des exercices oraux aux exercices écrits, notre plateforme propose une large gamme d'activités conçues par des experts en orthophonie.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-blue/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-therapy-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suivi des Progrès</h3>
              <p className="text-gray-600">
                Des analyses et des rapports détaillés pour surveiller les progrès des patients au fil du temps avec des graphiques visuels et des analyses.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-therapy-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Système de Ludification</h3>
              <p className="text-gray-600">
                Récompenses, badges et accomplissements pour maintenir les patients motivés et engagés dans leur thérapie.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-purple/10 rounded-lg flex items-center justify-center mb-4">
                <UserRound className="h-6 w-6 text-therapy-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plateforme Multi-Utilisateurs</h3>
              <p className="text-gray-600">
                Interfaces séparées pour les administrateurs, les thérapeutes et les patients avec des contrôles d'accès basés sur les rôles.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-therapy-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tâches Programmées</h3>
              <p className="text-gray-600">
                Les thérapeutes peuvent attribuer des exercices spécifiques et créer des plans de thérapie personnalisés pour chaque patient.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-therapy-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-therapy-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enregistrement Vocal</h3>
              <p className="text-gray-600">
                Capturez et révisez les exercices vocaux avec des outils d'enregistrement intégrés pour une meilleure évaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-therapy-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comment Fonctionne OrthoBoost</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Notre plateforme connecte les thérapeutes et les patients dans une expérience unifiée
            </p>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-10 bottom-10 w-1 bg-therapy-purple/20 hidden md:block"></div>
            
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right order-2 md:order-1">
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <h3 className="text-xl font-semibold mb-2">1. Assignation par le Thérapeute</h3>
                    <p className="text-gray-600">
                      Les thérapeutes attribuent des exercices appropriés en fonction des besoins des patients et des objectifs thérapeutiques.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 order-1 md:order-2 relative">
                  <div className="h-12 w-12 bg-therapy-purple text-white rounded-full flex items-center justify-center mx-auto z-10 relative">
                    <span className="font-bold">1</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 relative order-1">
                  <div className="h-12 w-12 bg-therapy-blue text-white rounded-full flex items-center justify-center mx-auto z-10 relative">
                    <span className="font-bold">2</span>
                  </div>
                </div>
                <div className="md:w-1/2 order-2">
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <h3 className="text-xl font-semibold mb-2">2. Engagement du Patient</h3>
                    <p className="text-gray-600">
                      Les patients réalisent des exercices ludiques et gamifiés à travers leur tableau de bord personnalisé.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right order-2 md:order-1">
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <h3 className="text-xl font-semibold mb-2">3. Suivi des Progrès</h3>
                    <p className="text-gray-600">
                      Les résultats sont automatiquement enregistrés et analysés pour suivre l'amélioration au fil du temps.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 order-1 md:order-2 relative">
                  <div className="h-12 w-12 bg-therapy-orange text-white rounded-full flex items-center justify-center mx-auto z-10 relative">
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 relative order-1">
                  <div className="h-12 w-12 bg-therapy-purple text-white rounded-full flex items-center justify-center mx-auto z-10 relative">
                    <span className="font-bold">4</span>
                  </div>
                </div>
                <div className="md:w-1/2 order-2">
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <h3 className="text-xl font-semibold mb-2">4. Analyse des Données</h3>
                    <p className="text-gray-600">
                      Les thérapeutes examinent les données, ajustent les plans de traitement et fournissent des commentaires personnalisés.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ce Que Disent Nos Utilisateurs</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Écoutez les témoignages des thérapeutes et des parents sur l'impact d'OrthoBoost
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="font-semibold text-gray-600">LJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Lisa Johnson</h4>
                  <p className="text-sm text-gray-600">Orthophoniste</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "OrthoBoost a révolutionné ma pratique. Mes patients sont plus engagés et je peux suivre leurs progrès plus efficacement que jamais."
              </p>
              <div className="flex mt-4 text-therapy-orange">
                <span>★★★★★</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="font-semibold text-gray-600">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michel Rodriguez</h4>
                  <p className="text-sm text-gray-600">Parent de Patient</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Mon fils redoutait les séances d'orthophonie, mais maintenant il demande à jouer à ses 'jeux d'orthophonie' tous les jours. La différence dans ses progrès est remarquable."
              </p>
              <div className="flex mt-4 text-therapy-orange">
                <span>★★★★★</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="font-semibold text-gray-600">SB</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sophie Blanc</h4>
                  <p className="text-sm text-gray-600">Directrice de Clinique</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "L'implémentation d'OrthoBoost dans notre clinique a amélioré les résultats des patients et l'efficacité des thérapeutes. Les analyses de données ont été inestimables."
              </p>
              <div className="flex mt-4 text-therapy-orange">
                <span>★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-therapy-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Transformer l'Orthophonie ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez les thérapeutes et les patients du monde entier qui utilisent OrthoBoost pour rendre la thérapie plus efficace et agréable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="rounded-full">
                Commencer Maintenant
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white/10">
                Demander une Démonstration
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Pourquoi Choisir OrthoBoost ?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-therapy-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Approche Fondée sur des Preuves</h3>
                    <p className="text-gray-600">Nos exercices sont développés par des orthophonistes certifiés suivant des méthodologies éprouvées.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-therapy-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Adapté à Tous les Âges</h3>
                    <p className="text-gray-600">Des jeux et des activités adaptés à l'âge qui maintiennent les patients motivés et les incitent à revenir.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-therapy-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Données Complètes</h3>
                    <p className="text-gray-600">Des analyses détaillées fournissent des informations permettant aux thérapeutes d'adapter efficacement les plans de traitement.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-therapy-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Sécurisé et Privé</h3>
                    <p className="text-gray-600">Plateforme conforme aux normes de sécurité garantissant que les données des patients sont toujours protégées.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-therapy-blue/10 rounded-full z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-therapy-purple/10 rounded-full z-0"></div>
              <img 
                src="/lovable-uploads/09860b05-c1dd-41f6-8ed7-5e885aed7ef5.png" 
                alt="Plateforme OrthoBoost" 
                className="rounded-xl shadow-lg z-10 relative w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-therapy-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/lovable-uploads/5c8491f6-a38b-4ec4-acd7-f60122594862.png" 
                  alt="OrthoBoost Logo" 
                  className="w-10 h-10 object-contain bg-white rounded-full"
                />
                <span className="font-bold text-xl">OrthoBoost</span>
              </div>
              <p className="text-sm text-gray-300">
                Rendre l'orthophonie efficace, engageante et agréable pour tous.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Produits</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Pour les Thérapeutes</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Pour les Patients</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Pour les Cliniques</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Entreprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Recherche</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">À Propos de Nous</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Carrières</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Politique de Confidentialité</a></li>
                <li><a href="#" className="text-sm text-gray-300 hover:text-white">Conditions d'Utilisation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 OrthoBoost. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
