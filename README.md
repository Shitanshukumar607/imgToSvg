<div align="center">

# 🎨 imgToSvg

### Transform Raster Images into Beautiful Scalable Vectors

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Demo](https://imgtosvg.vercel.app) • [Report Bug](https://github.com/Shitanshukumar607/imgToSvg/issues) • [Request Feature](https://github.com/Shitanshukumar607/imgToSvg/issues)

</div>

---

## 🌟 Overview

**imgToSvg** is a powerful, modern web application that converts your raster images (PNG, JPG, JPEG, GIF, BMP) into crisp, scalable vector graphics (SVG). Built with the latest web technologies, it offers a seamless, intuitive experience with real-time preview, instant downloads, and cloud processing.

### ✨ Why imgToSvg?

- 🚀 **Lightning Fast** - Process images in seconds with optimized algorithms
- 🎨 **High Quality** - Advanced vectorization using ImageTracer.js
- 🌐 **Cloud-Powered** - Integrated with Cloudinary for reliable image hosting
- 💎 **Beautiful UI** - Modern, responsive design with smooth animations
- 🔒 **Secure** - Client-side processing with secure cloud backup
- 📱 **Mobile-Friendly** - Works perfectly on all devices

---

## 🎯 Features

### Core Functionality
- 🖼️ **Multi-Format Support** - Upload PNG, JPG, JPEG, GIF, and BMP images
- 🔄 **Instant Conversion** - Transform raster images to SVG in real-time
- 👁️ **Live Preview** - See your generated SVG immediately
- 📋 **One-Click Copy** - Copy SVG code to clipboard instantly
- 💾 **Download** - Save as `.svg` file with proper formatting
- 📏 **Auto-Scaling** - Responsive SVG with viewBox support

### User Experience
- 🎭 **Drag & Drop** - Intuitive file upload interface
- ⚡ **Progress Tracking** - Real-time conversion progress
- 🌓 **Dark Mode** - Beautiful light and dark themes
- 🎬 **Smooth Animations** - Framer Motion powered interactions
- ⚠️ **Error Handling** - Clear, helpful error messages
- 📊 **File Size Display** - See original file size instantly

### Advanced Features
- ☁️ **Cloud Storage** - Automatic Cloudinary integration
- 🔧 **Configurable Options** - Customizable vectorization settings
- 🎨 **Theme Customization** - Emerald (light) and Violet (dark) color schemes
- 📐 **ViewBox Generation** - Automatic viewBox calculation for responsive SVGs

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Backend & Processing
- **[ImageTracer.js](https://github.com/jankovicsandras/imagetracerjs)** - Image vectorization engine
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing
- **[Cloudinary](https://cloudinary.com/)** - Cloud-based image management
- **[Supabase](https://supabase.com/)** - Authentication and database (optional)

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Turbopack](https://turbo.build/pack)** - Next-gen bundler

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** 20.x or higher
- **npm** or **yarn** package manager
- **Cloudinary account** (for image upload functionality)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shitanshukumar607/imgToSvg.git
   cd imgToSvg
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Cloudinary Configuration (Required for image upload)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Supabase Configuration (Optional - for auth features)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   > **Getting Cloudinary Credentials:**
   > 1. Sign up at [cloudinary.com](https://cloudinary.com/)
   > 2. Go to Dashboard → Account Details
   > 3. Copy Cloud Name, API Key, and API Secret

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🚀 Usage

### Basic Workflow

1. **Upload Image**
   - Click the upload area or drag & drop your image
   - Supported formats: PNG, JPG, JPEG, GIF, BMP
   - Maximum file size: 5 MB

2. **Convert to SVG**
   - Click the "Convert to SVG" button
   - Watch the progress bar as your image is processed
   - Processing typically takes 2-5 seconds

3. **Preview & Download**
   - View your SVG in the live preview panel
   - See the raw SVG code in the code panel
   - Copy the code or download the `.svg` file

### API Endpoint

The conversion API is available at `/api/upload`:

```typescript
POST /api/upload
Content-Type: multipart/form-data

Body: {
  image: File
}

Response: {
  url: string,        // Cloudinary URL of uploaded image
  svg: string,        // Generated SVG string
  success: boolean
}
```

---

## 📸 Screenshots

> **Note:** Add your actual screenshots here after deployment

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)

### Upload & Convert
![Upload Interface](https://via.placeholder.com/800x400?text=Upload+Interface)

### SVG Preview & Download
![Results Page](https://via.placeholder.com/800x400?text=SVG+Results)

---

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run prettier:check  # Check code formatting
npm run prettier:write  # Format code with Prettier
npm run type-check   # Run TypeScript compiler check
```

### Project Structure

```
imgToSvg/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── upload/        # Image upload & conversion endpoint
│   ├── generate/          # SVG generation page
│   ├── collections/       # User collections (coming soon)
│   ├── auth/              # Authentication pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Home/             # Home page components
│   ├── NavbarComponents/ # Navigation components
│   ├── ui/               # Reusable UI components
│   └── Footer/           # Footer component
├── lib/                   # Utility functions
│   ├── utils.ts          # General utilities
│   └── supabase/         # Supabase client
├── hooks/                 # Custom React hooks
├── store/                 # State management (Zustand)
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

---

## 🔮 Roadmap

### Coming Soon
- [ ] 🎨 **SVG Editor** - Basic editing tools (resize, recolor, simplify paths)
- [ ] 📊 **Presets** - Pre-configured styles (outline only, reduced colors, full color)
- [ ] 📂 **Batch Upload** - Convert multiple images at once
- [ ] 💾 **Collections** - Save and organize your converted SVGs
- [ ] 🔐 **User Accounts** - Save your work across devices
- [ ] 🎯 **Advanced Options** - Fine-tune vectorization parameters
- [ ] 📱 **Mobile App** - Native iOS and Android apps
- [ ] 🤖 **AI Enhancement** - AI-powered image optimization

### Under Consideration
- [ ] 🌈 **Color Palette Extraction** - Extract and modify color schemes
- [ ] 🔄 **Format Conversion** - Convert to other vector formats (EPS, PDF)
- [ ] 📈 **Analytics Dashboard** - Track your conversion history
- [ ] 🌍 **Internationalization** - Multi-language support

---

## 🤝 Contributing

We love contributions! Help make imgToSvg even better.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/imgToSvg.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow the existing code style
   - Add tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes in detail
   - Reference any related issues

### Development Guidelines

- Follow the [TypeScript style guide](https://google.github.io/styleguide/tsguide.html)
- Use Prettier for code formatting: `npm run prettier:write`
- Ensure all tests pass: `npm run test` (if tests exist)
- Update documentation for any API changes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits & Acknowledgments

### Built With Love By
- **[Shitanshu Kumar](https://github.com/Shitanshukumar607)** - Creator & Maintainer

### Special Thanks
- **[ImageTracer.js](https://github.com/jankovicsandras/imagetracerjs)** - Excellent vectorization library
- **[Cloudinary](https://cloudinary.com/)** - Reliable cloud image management
- **[Vercel](https://vercel.com/)** - Hosting platform
- **[Next.js Team](https://nextjs.org/)** - Amazing React framework

### Open Source Libraries
This project wouldn't be possible without these amazing open-source projects:
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

---

## 💬 Support

### Get Help
- 📖 [Documentation](https://github.com/Shitanshukumar607/imgToSvg/wiki)
- 🐛 [Issue Tracker](https://github.com/Shitanshukumar607/imgToSvg/issues)
- 💬 [Discussions](https://github.com/Shitanshukumar607/imgToSvg/discussions)

### Stay Connected
- ⭐ Star this repo if you find it helpful!
- 🐦 Share on Twitter
- 📧 Contact: [Your Email or Social Media]

---

<div align="center">

### Made with ❤️ and ☕

**[⬆ back to top](#-imgtosvg)**

</div>
