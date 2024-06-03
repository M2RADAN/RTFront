import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { RulerControl } from "@2gis/mapgl-ruler";

const MapglContext = createContext<{
  mapgl?: any;
  mapglInstance?: any;
  rulerControl?: RulerControl;
  setMapglContext: Dispatch<SetStateAction<MapContextState>>;
}>({
  mapgl: undefined,
  mapglInstance: undefined,
  rulerControl: undefined,
  setMapglContext: () => {},
});

interface MapContextState {
  mapglInstance?: any;
  mapgl?: any;
  rulerControl?: RulerControl;
}

export function useMapglContext() {
  return useContext(MapglContext);
}

export function MapglContextProvider({ children }: { children: ReactNode }) {
  const [{ mapglInstance, rulerControl, mapgl }, setMapglContext] =
    useState<MapContextState>({
      mapglInstance: undefined,
      rulerControl: undefined,
      mapgl: undefined,
    });
  return (
    <MapglContext.Provider
      value={{ mapgl, mapglInstance, rulerControl, setMapglContext }}
    >
      {children}
    </MapglContext.Provider>
  );
}
