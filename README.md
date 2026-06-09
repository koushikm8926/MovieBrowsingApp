# Movie Browsing App

This is a React Native mobile application built for the GARS Technology Internshala assignment. It is a cross-platform movie browsing application that integrates with the TMDB API to deliver dynamic media content, smooth transitions, and inline trailer playback.

## Showcase

**App Demonstration (iPhone 16 Pro)**  
Watch the screen recording demonstrating the app running on the iOS Simulator:  
[View App Demonstration on Google Drive](https://drive.google.com/file/d/1NJ3qAyODFjki8MT6zMuAWYf_4qHWl9LO/view?usp=sharing)

## Technical Details

- **Framework**: React Native (Bare Workflow) v0.85.3
- **Navigation**: React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`)
- **Networking**: Axios
- **Video Player**: `react-native-youtube-iframe` (along with `react-native-webview`)

## Features

- **Home Screen**: Highlights a top trending movie in a hero section with trailer playback. Includes categorized carousels for "Trending Now", "Top Rated", and "Upcoming Releases".
- **Search Screen**: Allows users to dynamically search for movies by title. 
- **Movie Detail Screen**: Displays detailed metadata (release date, runtime, rating, genres, plot summary) and features an inline YouTube trailer player for an immersive experience.
- **State & Data**: All data manipulation, API requests, and state persistence are managed purely within the React Native client (Zero Backend).

## Environment Setup

To run this application, you must provide a valid TMDB API key.

1. Open `src/services/api.js`.
2. Locate the `API_KEY` constant.
3. Replace `'YOUR_TMDB_API_KEY_HERE'` with your actual TMDB API v3 Key.

*Note: In a production environment, you should use `react-native-dotenv` or a similar package to keep your keys secure inside a `.env` file.*

## Running the App

### Prerequisites

- Node.js
- Yarn or npm
- macOS with Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. Clone the repository and navigate to the project root:
   ```bash
   cd MovieBrowsingApp
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Install iOS CocoaPods:
   ```bash
   cd ios && pod install && cd ..
   ```

### Start the Application

**For iOS:**
```bash
yarn react-native run-ios
```

**For Android:**
```bash
yarn react-native run-android
```
