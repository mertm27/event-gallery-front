# Wedding Photos - Mobile Photo Sharing App

A mobile-first wedding photo sharing web application built with React, TypeScript, and Vite. Guests can access the app via QR code links and share photos from their phones directly to a shared gallery.

## 🚀 Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **QR Code Access**: Guests join via QR code with event tokens
- **Photo Gallery**: Infinite scroll grid with masonry layout
- **Photo Upload**: Direct camera capture or gallery selection with compression
- **Lightbox Viewer**: Full-screen photo viewing with swipe navigation
- **PWA Support**: Installable app with offline capabilities
- **Dark Mode**: Automatic dark mode support
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom mobile optimizations
- **State Management**: Zustand for app state, React Query for server state
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Image Processing**: CompressorJS for client-side compression
- **PWA**: Service Worker + Web App Manifest

## 📱 Mobile Optimizations

- Safe area insets for iOS devices
- Touch-friendly 44px minimum tap targets
- Swipe gestures for lightbox navigation
- Prevent zoom on input focus
- Optimized for 390×844 viewport (iPhone 12/13/14)
- Smooth animations with reduced motion support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-photos
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo

Try the demo with event code: `wedding2025`

## 📁 Project Structure

```
src/
├── api/
│   ├── client.ts          # Mock API client
│   └── queryKeys.ts       # React Query keys
├── components/
│   ├── GalleryGrid.tsx    # Photo grid with infinite scroll
│   ├── Header.tsx         # App header with upload button
│   ├── Lightbox.tsx       # Full-screen photo viewer
│   ├── NicknameDialog.tsx # User name prompt
│   ├── PhotoCard.tsx      # Individual photo card
│   ├── Toasts.tsx         # Notification system
│   └── UploadDrawer.tsx   # Photo upload interface
├── hooks/
│   └── useInfinitePhotos.ts # Infinite scroll hook
├── pages/
│   ├── AdminPlaceholder.tsx # Admin panel (placeholder)
│   ├── CodeGate.tsx       # Event code entry
│   ├── GalleryPage.tsx    # Main gallery view
│   ├── Privacy.tsx        # Privacy policy
│   └── Terms.tsx          # Terms of service
├── store/
│   └── appStore.ts        # Zustand store
├── utils/
│   ├── image.ts           # Image processing utilities
│   └── time.ts            # Date/time formatting
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main app component
└── main.tsx               # App entry point
```

## 🔧 API Integration

The app uses a mock API client that can be easily replaced with a real backend. The API interface includes:

### Methods to Implement

```typescript
// Event management
getEventInfo(token: InviteToken): Promise<EventInfo>

// Photo management  
listPhotos(req: ListPhotosRequest): Promise<ListPhotosResponse>
beginUpload(req: BeginUploadRequest): Promise<BeginUploadResponse>
completeUpload(req: CompleteUploadRequest): Promise<{ ok: true }>
```

### Backend Requirements

When implementing the real backend, you'll need to:

1. **Authentication**: JWT-based auth for admin access
2. **File Storage**: Secure file upload with presigned URLs
3. **Database**: Store events, photos, and metadata
4. **Security**: Rate limiting, file validation, access controls
5. **CDN**: Image optimization and delivery

## 🎨 Customization

### Theming

The app uses Tailwind CSS with a custom color palette. Main colors can be modified in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#fef7ff',
    // ... primary color scale
    950: '#520a5f',
  },
}
```

### Branding

Update the app name, colors, and icons in:
- `public/manifest.webmanifest`
- `index.html` (title, meta tags)
- `src/pages/CodeGate.tsx` (logo, branding)

## 📱 PWA Features

The app is a Progressive Web App with:

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Cached static assets and shell
- **App-like Experience**: Full-screen mode, custom splash screen
- **Push Notifications**: Ready for future implementation

## 🔒 Security Considerations

- **File Validation**: Client-side validation for image types and sizes
- **Rate Limiting**: Should be implemented on the backend
- **Access Control**: Event codes provide basic access control
- **Data Privacy**: Minimal data collection, clear privacy policy

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

The app can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Ensure HTTPS is enabled for PWA features

### Environment Variables

No environment variables are required for the frontend. Backend integration will require:

- `VITE_API_URL`: Backend API endpoint
- `VITE_CDN_URL`: CDN URL for image delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:

- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔮 Future Enhancements

- **Real Backend**: Node.js + Express implementation
- **Admin Panel**: Full event management interface
- **Analytics**: Upload statistics and engagement metrics
- **Moderation**: Content moderation tools
- **Social Features**: Photo likes, comments, sharing
- **Advanced PWA**: Background sync, push notifications
- **Multi-language**: Internationalization support

---

Made with ❤️ for special moments