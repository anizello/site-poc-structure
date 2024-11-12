type VehicleType = "car" | "motorcycle";

type UserVehicleProps = {
  id?: number;
  brand: string;
  model: string;
  plate: string;
  color?: string;
  type: VehicleType;
};

type UserAddressProps = {
  id?: number;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  province: string;
  country: string;
};

export type UserProps = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: string;
  country?: string;
  province?: string;
  city?: string;
  vehicle?: UserVehicleProps | null;
  reservations?: [];
  address?: UserAddressProps | null;
  selfie_validation?: string | null;
  document_validation?: string | null;
};
