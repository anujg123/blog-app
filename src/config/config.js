const config = {
    appwriteurl: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteprojectid: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteurldatabaseid: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteurlcollectionid: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwritebauketid: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
}

export default config;