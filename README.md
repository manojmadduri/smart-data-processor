# Smart Data Processor

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node.js-v16+-green.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)

Smart Data Processor is a full-stack web application that transforms `.txt` diary files into structured JSONL datasets optimized for LLM fine-tuning and vector embeddings.

---

## 🧱 Project Structure

```
smart-data-processor/
├── backend/                          # Node.js + Python backend
│   ├── server.js                     # Express server
│   ├── package.json                  # Node dependencies
│   ├── requirements.txt              # Python dependencies
│   ├── nltk_setup.py                 # NLTK data downloader
│   └── scripts/
│       ├── generate_jsonl_smart.py   # Main processing script
│       └── prepare_finetune_dataset.py # Fine-tune formatter
└── frontend/                         # React frontend
    ├── package.json
    ├── public/
    └── src/
        ├── pages/
        │   └── UploadPage.jsx
        ├── components/
        │   ├── FileUploader.jsx
        │   ├── ProgressSpinner.jsx
        │   └── JSONPreviewModal.jsx
        └── services/
            └── api.js
```

---

## 🌟 Features

- 📁 **Drag & Drop Upload** - Easy file handling with visual feedback
- 🧠 **Intelligent Processing** - NLP-powered question generation
- 📊 **Dual Output Formats** - Memory retrieval & fine-tuning datasets
- 🎨 **Modern UI** - Clean interface with dark mode support
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Real-time Processing** - Live progress tracking

---

## ⚙️ Backend Deployment (Render)

### 1. Push to GitHub
Ensure your project is committed and pushed to GitHub.

### 2. Create Render Web Service
- Go to [Render.com](https://render.com)
- Create **New Web Service**
- Connect your GitHub repository
- **Root Directory:** `backend/`
- **Runtime:** Node

### 3. Configure Build & Start Commands
**Build Command:**
```bash
npm install && pip3 install --no-cache-dir -r requirements.txt && python3 nltk_setup.py
```

**Start Command:**
```bash
node server.js
```

### 4. Environment Variables
Set these in Render Dashboard:
```
PORT=4000
UPLOAD_DIR=uploads
PYTHON_PATH=python3
```

### 5. Update server.js for Production
Ensure proper port binding and CORS:
```js
const port = process.env.PORT || 4000;

const cors = require('cors');
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST']
}));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

---

## 🌐 Frontend Deployment (Vercel)

### 1. Connect to Vercel
- Go to [Vercel.com](https://vercel.com)
- Import your GitHub repository
- Select the `frontend/` directory

### 2. Configure Build Settings
- **Framework Preset:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Root Directory:** `frontend`

### 3. Environment Variables
Add in Vercel Dashboard:
```
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

### 4. Update API Configuration
In `frontend/src/services/api.js`:
```js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 300000, // 5 minutes for large file processing
});
```

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js with Express
- **Processing:** Python 3 with NLP libraries
- **NLP Libraries:** NLTK, SentenceTransformers, Transformers
- **File Handling:** Multer for uploads
- **Deployment:** Render

### Frontend
- **Framework:** React with Create React App
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Heroicons
- **State Management:** React Hooks
- **Deployment:** Vercel

---

## 📝 Core Processing Scripts

### `generate_jsonl_smart.py`
- Extracts and processes text from diary files
- Generates intelligent questions using sentence embeddings
- Performs zero-shot topic classification
- Normalizes dates to YYYY-MM-DD format
- Outputs structured memory entries

### `prepare_finetune_dataset.py`
- Transforms memory entries into fine-tuning format
- Creates prompt-completion pairs
- Optimizes for LLM training compatibility

### `nltk_setup.py`
- Pre-downloads required NLTK data
- Ensures punkt tokenizer availability
- Handles deployment environment setup

---

## 🚀 Local Development

### Prerequisites
- Node.js (v16+)
- Python 3.8+
- Git

### Backend Setup
```bash
cd backend
npm install
pip install -r requirements.txt
python nltk_setup.py
node server.js
```
Server runs on: `http://localhost:4000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

### Environment Configuration
Create `.env` in frontend directory:
```
REACT_APP_API_URL=http://localhost:4000
```

---

## 📱 Usage Guide

1. **Access the Application**
   - Open your deployed frontend URL or localhost:3000

2. **Upload Files**
   - Drag and drop `.txt` files or click to browse
   - Multiple files supported

3. **Process Data**
   - Click "Process Files" button
   - Monitor progress with real-time updates

4. **Download Results**
   - `memories.jsonl` - For vector databases and RAG
   - `finetune_data.jsonl` - For LLM fine-tuning

5. **Preview Data**
   - Use preview modal to inspect generated data
   - Verify quality before download

---

## 🔧 Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure frontend URL is added to backend CORS configuration
- Check environment variables are properly set

**Processing Timeouts:**
- Large files may take 30+ seconds to process
- Ensure timeout values are sufficient in both frontend and backend

**Python Dependencies:**
- Verify all packages in requirements.txt are installed
- Check Python path configuration on deployment platform

**NLTK Data Missing:**
- Ensure nltk_setup.py runs during build process
- Verify NLTK data downloads successfully

---

## 📊 Output Format Examples

### Smart JSONL (memories.jsonl)
```json
{
  "input": "What personal reflection or thought did I have?",
  "output": "Today I realized how much I appreciate quiet moments.",
  "date": "2024-01-15",
  "topic": "Personal Growth"
}
```

### Fine-tune JSONL (finetune_data.jsonl)
```json
{
  "prompt": "What personal reflection or thought did I have?",
  "completion": "Today I realized how much I appreciate quiet moments."
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Maintained by

**Manoj Madduri**  
📧 Email: mmanoj.fall2021@gmail.com  
🔗 GitHub: [@manojmadduri](https://github.com/manojmadduri)  
💼 LinkedIn: [Connect with me](https://linkedin.com/in/manojmadduri)

---

## 🚀 Live Demo

- **Frontend:** `https://your-vercel-app.vercel.app`
- **Backend API:** `https://your-backend-service.onrender.com`

---

*Built with ❤️ using React, Node.js, and Python*
