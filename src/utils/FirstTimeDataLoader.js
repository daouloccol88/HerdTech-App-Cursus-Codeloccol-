"use client";

import { useEffect } from "react";

export default function FirstTimeDataLoader() {
  useEffect(() => {
    const isInitialized = localStorage.getItem("farm_initialized");
    if (isInitialized) return;

    // --------------------
    // USERS
    // --------------------
    const users = [
      {
        id: generateIdCustomLength(10),
        name: "Mallam",
        password: "123",
        email: "mallam@farm.com",
      },
      {
        id: generateIdCustomLength(10),
        name: "Mallama",
        password: "123",
        email: "mallama@farm.com",
      },
    ];

    function getRandomUserId(users) {
      if (!users || users.length === 0) return null;
      return users[Math.floor(Math.random() * users.length)].id;
    }
    function getUserId(index) {
      if (!users || users.length === 0) return null;
      return users[index].id;
    }

    function generateIdCustomLength(length) {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let id = "";

      for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return id;
    }

    // --------------------
    // TAGS (NEW COLLECTION)
    // --------------------
    const tag = ["TAG_1", "TAG_2", "TAG_3", "TAG_4", "TAG_5"];

    const tags = tag.map((t) => ({
      id: generateIdCustomLength(24),
      label: t,
      userId: getRandomUserId(users),
    }));

    // --------------------
    // ANIMALS GENERATOR
    // --------------------
    const categories = ["bovins", "ovins"];
    const statusList = ["sain", "malade", "vendu", "mort"];
    const sexList = ["male", "female"];

    const generateAnimals = (count, userId) => {
      return Array.from({ length: count }, (_, i) => {
        // pick a random tag from the tag collection
        const randomTag = tags[Math.floor(Math.random() * tags.length)].label;

        return {
          id: generateIdCustomLength(20),
          RFIDTag: randomTag, // ✅ TAG APPLIED HERE
          category: categories[Math.floor(Math.random() * categories.length)],
          sex: sexList[Math.floor(Math.random() * sexList.length)],
          birthDate: new Date(
            2019 + Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28)
          ).toISOString(),
          status: statusList[Math.floor(Math.random() * statusList.length)],
          userId: userId,
        };
      });
    };

    const animalsUser1 = generateAnimals(30, getUserId(0));
    const animalsUser2 = generateAnimals(40, getUserId(1));
    const animals = [...animalsUser1, ...animalsUser2];

    // --------------------
    // TODOS GENERATOR
    // --------------------
    const todoNames = [
      "Nettoyer l’étable",
      "Donner à manger aux animaux",
      "Vérifier les clôtures",
      "Traire les vaches",
      "Soigner un animal malade",
      "Acheter du fourrage",
      "Réparer l’abreuvoir",
      "Peser les veaux",
      "Désinfecter l’enclos",
      "Préparer les vaccins",
    ];

    const todoStatus = ["todo", "done"];

    const generateTodos = (count) => {
      return Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        name: todoNames[Math.floor(Math.random() * todoNames.length)],
        status: todoStatus[Math.floor(Math.random() * todoStatus.length)],
        userId: getRandomUserId(users),
      }));
    };

    const todos = generateTodos(20);

    // --------------------
    // NOTIFICATIONS GENERATOR
    // --------------------
    const notifCategories = [
      "Notification de routine",
      "Notification de vérification",
      "Notification de danger",
      "Notification critique",
    ];

    const notifMessages = [
      "Un animal a besoin d’une vérification.",
      "La réserve de fourrage est basse.",
      "Une visite vétérinaire est prévue bientôt.",
      "Un nouvel animal a été ajouté à l’enclos.",
      "Température anormale détectée dans l’étable.",
      "Nettoyage général recommandé aujourd’hui.",
      "Votre troupeau est en bonne santé.",
      "Un veau est né ce matin.",
      "Clôture latérale endommagée.",
      "Mise à jour de votre tableau de bord disponible.",
    ];

    const generateNotifications = (count) => {
      return Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i + 5000,
        category:
          notifCategories[Math.floor(Math.random() * notifCategories.length)],
        content:
          notifMessages[Math.floor(Math.random() * notifMessages.length)],
        userId: getRandomUserId(users),
        date: new Date().toISOString(),
      }));
    };

    const notifications = generateNotifications(30);

    //Map marker
    const mapsMarker = [
      {
        id: generateIdCustomLength(9),
        category: "Vaches",
        coordinate: "13.49513414293332, 2.1088086623757296",
      },
      {
        id: generateIdCustomLength(9),
        category: "Vaches",
        coordinate: "13.49540017433828, 2.1089588660886815",
      },
      {
        id: generateIdCustomLength(9),
        category: "Taureaux",
        coordinate: "13.495567095852774, 2.109055425618436",
      },
      {
        id: generateIdCustomLength(9),
        category: "Taureaux",
        coordinate: "13.495853991933128, 2.1092056293313886",
      },
      {
        id: generateIdCustomLength(9),
        category: "Béliers",
        coordinate: "13.494703309093653, 2.1098280554952953",
      },
      {
        id: generateIdCustomLength(9),
        category: "Brebis",
        coordinate: "13.494827374624855, 2.1098854701351986",
      },
      {
        id: generateIdCustomLength(9),
        category: "Brebis",
        coordinate: "13.495087912030518, 2.1100066788194374",
      },
      {
        id: generateIdCustomLength(9),
        category: "Véhicule",
        coordinate: "13.494920423730953, 2.108647865675069",
      },
      {
        id: generateIdCustomLength(9),
        category: "Véhicule",
        coordinate: "13.494765341867314, 2.1088583860213794",
      },
      {
        id: generateIdCustomLength(9),
        category: "Véhicule",
        coordinate: "13.494610259902956, 2.109043388749955",
      },
      {
        id: generateIdCustomLength(9),
        category: "Ressources",
        coordinate: "13.494920423730953, 2.1089540770878843",
      },
      {
        id: generateIdCustomLength(9),
        category: "Ressources",
        coordinate: "13.49483978117443, 2.109126321007593",
      },
      {
        id: generateIdCustomLength(9),
        category: "Ressources",
        coordinate: "13.49475293531387, 2.1092858061184345",
      },
      {
        id: generateIdCustomLength(9),
        category: "Stockage",
        coordinate: "13.495274010003344, 2.109234770882965",
      },
      {
        id: generateIdCustomLength(9),
        category: "Stockage",
        coordinate: "13.495143741437593, 2.109445291229276",
      },
      {
        id: generateIdCustomLength(9),
        category: "Stockage",
        coordinate: "13.495627595752062, 2.109426153015975",
      },
      {
        id: generateIdCustomLength(9),
        category: "Stockage",
        coordinate: "13.495410481757897, 2.1096940880021884",
      },
      {
        id: generateIdCustomLength(9),
        category: "Stockage",
        coordinate: "13.49551593715115, 2.11011512869481",
      },
      {
        id: generateIdCustomLength(9),
        category: "Stockage",
        coordinate: "13.495435294795781, 2.110319269636687",
      },
      {
        id: generateIdCustomLength(9),
        category: "Capteurs",
        coordinate: "13.49625412359966, 2.110204440356881",
      },
      {
        id: generateIdCustomLength(9),
        category: "Capteurs",
        coordinate: "13.496452627129157, 2.1103830636810237",
      },
      {
        id: generateIdCustomLength(9),
        category: "Capteurs",
        coordinate: "13.496030806931685, 2.110523410578564",
      },
      {
        id: generateIdCustomLength(9),
        category: "Capteurs",
        coordinate: "13.496229310646862, 2.1106573780716706",
      },
      {
        id: generateIdCustomLength(9),
        category: "Capteurs",
        coordinate: "13.49570823804247, 2.1107913455647775",
      },
      {
        id: generateIdCustomLength(9),
        category: "Capteurs",
        coordinate: "13.496105245844225, 2.1110784187642926",
      },
      {
        id: generateIdCustomLength(9),
        category: "Capteurs",
        coordinate: "13.495962571241462, 2.111314456728338",
      },
      {
        id: generateIdCustomLength(9),
        category: "Capteurs",
        coordinate: "13.495528343664938, 2.1110784187642926",
      },
    ];

    // --------------------
    // SAVE TO LOCALSTORAGE
    // --------------------
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("animals", JSON.stringify(animals));
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("tags", JSON.stringify(tags)); // collection
    localStorage.setItem("marker", JSON.stringify(mapsMarker));
    localStorage.setItem("farm_initialized", "true");

    console.log("✅ Farm demo data initialized with tags applied to animals");
  }, []);

  return null;
}
