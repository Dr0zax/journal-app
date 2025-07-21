import { quoteTemp, entryTemp } from "./templates/templates.mjs";

const quoteAPIBaseURL = "https://thequoteshub.com/api/random-quote";
const backendURL = import.meta.env.VITE_BACKEND_SERVER;

export function getLocalStorage(key) {
    return localStorage.getItem(key);
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, data);
}

async function getQuote() {
    const today = new Date().toISOString().slice(0, 10); // e.g., "2024-06-08"
    const stored = JSON.parse(localStorage.getItem("dailyQuote") || "{}");

    if (stored.date === today && stored.quote) {
        return stored.quote;
    }

    try {
        const options = {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            }
        };

        let response = await fetch(`${quoteAPIBaseURL}`, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch quote: ${response.status}`);
        }

        let data = await response.json();

        // Store quote and date in localStorage
        setLocalStorage("dailyQuote", JSON.stringify({ date: today, quote: data }));

        return data;
    } catch (e) {
        console.error("Error fetching quote:", e);
        // Fallback: return stored quote if available
        if (stored.quote) return stored.quote;
    }
}

export async function displayQuote() {
    const quoteEl = document.querySelector("#daily-quote");
    const quoteElContent = quoteEl.querySelector('.module-content');
    const quoteData = await getQuote();

    // If quoteData is a single object, not an array, wrap it in an array
    const quotes = Array.isArray(quoteData) ? quoteData : [quoteData];
    const quoteHTML = quotes.map(quoteTemp).join("");
    quoteElContent.innerHTML = quoteHTML;
}

async function getPropmt() {
    const today = new Date().toISOString().slice(0, 10); // e.g., "2024-06-08"
    const stored = JSON.parse(localStorage.getItem("dailyPrompt") || "{}");

    if (stored.date === today && stored.prompt) {
        return stored.prompt;
    }

    try {
        let response = await fetch("/json/prompts.json");

        if (!response.ok) {
            throw new Error(`Failed to fetch quote: ${response.status}`);
        }

        let prompt = await response.json();
        const randomIndex = Math.floor(Math.random() * prompt.length);

        // Store quote and date in localStorage
        setLocalStorage("dailyPrompt", JSON.stringify({ date: today, prompt: prompt[randomIndex] }));

        return prompt[randomIndex];
    } catch (e) {
        console.error("Error fetching prompt:", e);
        // Fallback: return stored quote if available
        if (stored.prompt) return stored.prompt;
    }
}

export async function displayPrompt() {
    const promptEl = document.querySelector("#daily-prompt");
    const promptElContent = promptEl.querySelector(".module-content");
    const prompt = await getPropmt();

    const promptHTML = `<p>${prompt.text}</p>`
    promptElContent.insertAdjacentHTML("afterbegin", promptHTML);
}

export async function getEntries() {
    const token = getLocalStorage("token");

    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await fetch(`${backendURL}/entries`, options);

    if (!response.ok) {
        console.error("Failed to fetch entries", response.statusText);
    }

    const entries = await response.json();
    return entries;
}

export async function setEntry(content) {
    const token = getLocalStorage("token");

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({content})
    }

    const response = await fetch(`${backendURL}/entries`, options);

    if (!response.ok) {
        console.error("Failed to set entry", response.statusText);
    }
}

export async function displayEntriesOnDash() {
    const entriesCont = document.querySelector(".entries-container");
    const entryData = await getEntries();
    let entries = entryData;
    
    console.log(entries);
    

    if (entryData.length > 3) {
        entries = entryData.slice(0, 3)
    }

    const entryHTML = entries.map(entryTemp).join("");
    entriesCont.insertAdjacentHTML("afterbegin", entryHTML);
}

export async function displayEntries() {
    const entriesCont = document.querySelector(".entries-container");
    const entryData = await getEntries();

    const entryHTML = entryData.map(entryTemp).join("");
    entriesCont.insertAdjacentHTML("afterbegin", entryHTML);
}

export async function displayEntry(id) {
    const entriesCont = document.querySelector(".entry-container");
    const entryData = await getEntries();

    const entry = entryData.find((element) => element.id == id);

    const entryHTML = entryTemp(entry);
    entriesCont.insertAdjacentHTML("afterbegin", entryHTML);
}

export function setHeaderFooter() {
    let date = new Date();

    let dateEl = document.querySelector("#todays-date");
    dateEl.innerHTML = date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
    
    let copyYear = document.querySelector("#copy-year");
    copyYear.innerHTML = date.getFullYear();
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export async function login(uname, passwd) {

    const response = await fetch(`${backendURL}/auth/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uname, password: passwd })
    })
    
    const result = await response.json();

    if (!response.ok) {
        console.error("Could not login", response.statusText);
    }

    setLocalStorage('token', result.token);
    window.location.href = '/index.html';
}

export async function register(uname, passwd) {    
    const response = await fetch(`${backendURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uname, password: passwd})
    })

     const result = await response.json();

    if (!response.ok) {
        console.error("Could not register", response.statusText);
    }

    window.location.href = "/login.html";
}