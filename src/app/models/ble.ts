export interface BleDevice {
  name: string;
  id: string;
  rssi: number;
  advertising: ArrayBuffer;
  uuid: string
}