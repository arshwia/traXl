<!-- ================= ENGLISH VERSION ================= -->

<h1 align="center">traXl</h1>
<h3 align="center">Automated SRT Subtitle Translation via Google Sheets</h3>

<p align="center">
A lightweight Node.js tool for translating subtitle files without paid APIs
</p>

---

## 🚀 Overview

**traXl** is a Node.js-based utility that automatically translates `.srt` subtitle files by leveraging **Google Sheets** instead of paid translation APIs.

The tool extracts subtitle texts, sends them to a Google Sheet where translation is handled using built-in formulas like `GOOGLETRANSLATE`, then retrieves the translated content and generates a new subtitle file while preserving original timestamps.

This approach keeps translations transparent, editable, and cost-free.

---

## ✨ Features

- Automatic `.srt` subtitle translation
- Preserves original timestamps
- No paid translation APIs required
- Powered by Google Sheets API
- Editable translations directly in Google Sheets
- Simple and lightweight Node.js implementation

---

## 🔄 How It Works

1. Reads the input `.srt` file  
2. Extracts subtitle text lines  
3. Uploads texts to Google Sheets  
4. Translation is performed inside the sheet  
5. Fetches translated content  
6. Generates a new translated `.srt` file  

---

## 🛠 Tech Stack

<table align="center">
  <tr>
    <td align="center"><img src="https://icon.icepanel.io/Technology/svg/Node.js.svg" width="32"/><br>Node.js</td>
    <td align="center"><img src="https://icon.icepanel.io/Technology/svg/JavaScript.svg" width="32"/><br>JavaScript</td>
    <td align="center">
  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlesheets.svg" width="32"/><br>
  Google Sheets
</td>


  </tr>
</table>

---

## ⚙️ Requirements

- Node.js v14 or higher
- Google account
- Google Cloud project with Sheets API enabled
- A shared Google Sheet

---

## 🔑 Getting Google Sheets API JSON Credentials

To use Google Sheets API, you must create a **Service Account** and download its JSON key file.

### Steps

1. Go to **Google Cloud Console**  
   https://console.cloud.google.com  
   (VPN recommended)

2. Create a **new project**

3. Search for **Google Sheets API** and click **Enable**

4. Navigate to:  
   **APIs & Services → Credentials**

5. Click **Create Credentials → Service account**

6. Enter a service account name (e.g. `traxl-service-account`) and continue  
   (Role assignment can be skipped)

7. Open the created service account and go to the **Keys** tab

8. Click **Add Key → Create new key**

9. Select **JSON** and download the file

10. Move the downloaded file to the project root and rename it exactly to:

```text
service-account.json
