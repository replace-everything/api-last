interface ProcessedPhotoMetadata {
  pjobid?: number | null;
  pwoid?: number | null;
  pwotype?: string | null;
  puser?: string | null;
  photoname: string;
  photoext: string;
  photodts: Date;
  photolabel?: string | null;
  phototags?: string | null;
  photoorder?: number | null;
}

interface PhotoProcessingRequest {
  fileBuffer: string; // base64-encoded image buffer
  fileName: string; // original file name
  platform: string; // 'android' or 'ios'
  bucketName: string; // name of the S3 bucket
}

interface PhotoProcessingResponse {
  statusCode: number; // HTTP status code
  body: string; // Stringified JSON
  error?: string; // Error message, if any
}

interface Location {
  latitude: number;
  longitude: number;
}

interface ImageDetails {
  url: string;
  width: number;
  height: number;
  isFavorite: boolean;
  hidden: boolean;
  orientation: 'up' | 'down' | 'left' | 'right'; // Add more as needed
}

interface iOSPhoto {
  localIdentifier: string;
  creationDate: string;
  modificationDate: string;
  assetType: 'image' | 'video';
  duration: number;
  burstIdentifier?: string;
  sourceType: 'camera' | 'screenshot' | 'screen recording'; // Add more as needed
  mediaSubtypes: string[]; // Array of subtypes
  isHidden: boolean;
  isCloudShared: boolean;
  location: Location;
  image: ImageDetails;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface ImageDetails {
  url: string;
  width: number;
  height: number;
  isFavorite: boolean;
  hidden: boolean;
  orientation: 'up' | 'down' | 'left' | 'right'; // Add more as needed
}

interface iOSPhoto {
  localIdentifier: string;
  creationDate: string;
  modificationDate: string;
  assetType: 'image' | 'video';
  duration: number;
  burstIdentifier?: string;
  sourceType: 'camera' | 'screenshot' | 'screen recording'; // Add more as needed
  mediaSubtypes: string[]; // Array of subtypes
  isHidden: boolean;
  isCloudShared: boolean;
  location: Location;
  image: ImageDetails;
}
