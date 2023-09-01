export default interface BIMListItem {
  id: number;
  name: string;
  createdAt: string;
  map: {
    latitude: Number;
    longitude: Number;
  };

  updatedAt: string;
  url: string;
  __v: Number;
  _id: string;
  // Other properties
}
