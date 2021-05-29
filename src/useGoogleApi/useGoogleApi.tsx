import React, { useState, useEffect, useContext, createContext } from "react";

import { useScript } from "../useScript";

import { googleAPIClientId as clientId } from "../../credentials";

const gapiAttributes = {
  clientId,
  scope:
    "https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file ",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
};

const googleApiContext = createContext<GoogleApi>({
  isGoogleApiReady: false,
});

const useGoogleApiProvider = () => {
  const [isGoogleApiReady, setIsGoogleApiReady] = useState(false);
  const [scriptLoaded] = useScript("https://apis.google.com/js/platform.js");

  useEffect(() => {
    if (scriptLoaded) {
      const { gapi } = window;

      // @TODO move these to their corresponding providers
      gapi.load("client:auth2", () => {
        const authPromise = gapi.auth2.init(gapiAttributes).then(() => {
          console.log("authentication loaded");
        });
        const clientPromise = gapi.client.init(gapiAttributes).then(() => {
          console.log("client loaded", window.gapi.client.drive);
        });
        // @TODO this is drive related, move it
        const drivePromise = gapi.client.load("drive", "v3");

        Promise.all([authPromise, clientPromise, drivePromise]).then(() =>
          setIsGoogleApiReady(true)
        );
      });
    }
  }, [scriptLoaded]);

  return {
    isGoogleApiReady,
  };
};

export const GoogleApiProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const googleApi = useGoogleApiProvider();
  return (
    <googleApiContext.Provider value={googleApi}>
      {children}
    </googleApiContext.Provider>
  );
};

interface GoogleApi {
  isGoogleApiReady: boolean;
}

export const useGoogleApi = () => {
  return useContext<GoogleApi>(googleApiContext);
};
