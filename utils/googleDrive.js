import { google } from "googleapis";

export const createLettersFolder = async (accessToken) => {
  const drive = google.drive({ version: "v3", auth: accessToken });

  
  // Check if "Letters" folder exists
  const response = await drive.files.list({
    q: "name='Letters' and mimeType='application/vnd.google-apps.folder'",
    fields: "files(id, name)"
  });

  if (response.data.files.length > 0) {
    return response.data.files[0].id; // folder already exists, return ID
  }

  // Create the folder if it doesn't exist
  const fileMetadata = {
    name: "Letters",
    mimeType: "application/vnd.google-apps.folder",
  };

  const folder = await drive.files.create({
    resource: fileMetadata,
    fields: "id"
  });

  return folder.data.id;
};

