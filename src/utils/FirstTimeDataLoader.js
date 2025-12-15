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
        name: "Farmer Alpha",
        password: "123",
        email: "alpha@farm.com",
      },
      {
        id: generateIdCustomLength(10),
        name: "Farmer Beta",
        password: "123",
        email: "beta@farm.com",
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

    const notifications = generateNotifications(15);

    // --------------------
    // SAVE TO LOCALSTORAGE
    // --------------------
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("animals", JSON.stringify(animals));
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("tags", JSON.stringify(tags)); // collection

    localStorage.setItem("farm_initialized", "true");

    console.log("✅ Farm demo data initialized with tags applied to animals");
  }, []);

  return null;
}
