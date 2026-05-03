import axios from "axios";
import { API_URL, TOKEN, TUKTUKS } from "./config.js";

// ===== START LOG =====
console.log("🚀 TukTuk Simulator Started...");
console.log("🌐 API:", API_URL);
console.log("🚗 TukTuks:", TUKTUKS.length);

// ===== BASIC VALIDATION =====
if (!API_URL || !TOKEN || TUKTUKS.length === 0) {
  console.error("❌ Missing config! Check API_URL, TOKEN or TUKTUKS");
  process.exit(1);
}

// ===== RANDOM MOVEMENT =====
function randomOffset() {
  return (Math.random() - 0.5) * 0.01;
}

// ===== SEND LOCATION =====
async function sendLocation(tuktukId) {
  if (!tuktukId) {
    console.warn("⚠️ Skipping empty TukTuk ID");
    return;
  }

  const data = {
    tuktuk: tuktukId,
    latitude: 6.9271 + randomOffset(),
    longitude: 79.8612 + randomOffset(),
    speed: Math.floor(Math.random() * 60),
  };

  console.log(`➡ Sending → ${tuktukId}`);

  try {
    const res = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      timeout: 5000,
    });

    console.log(`✅ Success → ${tuktukId} | Status: ${res.status}`);
  } catch (err) {
    if (err.response) {
      console.error(`❌ API Error (${tuktukId}):`, err.response.data);
    } else if (err.request) {
      console.error(`❌ No response from server (${tuktukId})`);
    } else {
      console.error(`❌ Error (${tuktukId}):`, err.message);
    }
  }
}

// ===== LOOP =====
setInterval(() => {
  console.log("🔄 Sending batch...");
  TUKTUKS.forEach((id) => sendLocation(id));
}, 3000);