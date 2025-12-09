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
      { id: 1, name: "Farmer Alpha", email: "alpha@farm.com" },
      { id: 2, name: "Farmer Beta", email: "beta@farm.com" },
    ];

    // --------------------
    // ANIMALS GENERATOR
    // --------------------
    const categories = ["vache", "taureau", "chèvre", "mouton"];
    const statusList = ["sain", "malade", "vendu"];
    const sexList = ["male", "female"];

    const generateAnimals = (count, userId) => {
      return Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i + userId * 1000,
        RFIDTag: Math.floor(100000 + Math.random() * 900000),
        category: categories[Math.floor(Math.random() * categories.length)],
        sex: sexList[Math.floor(Math.random() * sexList.length)],
        birthDate: new Date(
          2019 + Math.floor(Math.random() * 6),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28)
        ).toISOString(),
        status: statusList[Math.floor(Math.random() * statusList.length)],
        userId,
      }));
    };

    const animalsUser1 = generateAnimals(30, 1);
    const animalsUser2 = generateAnimals(40, 2);
    const animals = [...animalsUser1, ...animalsUser2];

    // --------------------
    // TODOS GENERATOR ✅
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
        userId: Math.random() < 0.5 ? 1 : 2,
      }));
    };

    const todos = generateTodos(20);

    // --------------------
    // SAVE TO LOCALSTORAGE
    // --------------------
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("animals", JSON.stringify(animals));
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("farm_initialized", "true");

    console.log("✅ Farm demo data initialized");
  }, []);

  return null;
}
