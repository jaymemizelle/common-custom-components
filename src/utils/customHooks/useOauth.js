import axios from "axios";
import { useState, useEffect } from "react";

function useOauth() {
  const [accessToken, setAccessToken] = useState("");
  const secret = process.env.REACT_APP_DOORKEEPER_APP_SECRET;
  const id = process.env.REACT_APP_DOORKEEPER_APP_ID;
  const host = process.env.REACT_APP_DOORKEEPER_APP_URL;
  var refreshToken = "";

  useEffect(() => {
    // Reloads page if browser's back button was clicked 
    window.addEventListener( "pageshow", function ( event ) {
      var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
      if ( historyTraversal ) {
        window.location.reload();
      }
    });

    axios
      .get(
        `${host}/oauth/authorize?redirect_uri=urn:ietf:wg:oauth:2.0:oob&client_secret=${secret}&client_id=${id}&response_type=code`, {withCredentials: true}
      )
      .then((response) => {
        const authCode = response.data["redirect_uri"].code;
        const data = {
          grant_type: "authorization_code",
          client_id: id,
          client_secret: secret,
          redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
          code: authCode,
        };
        axios({
          method: "POST",
          url: `${host}/oauth/token.json`,
          data: data,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            refreshToken = res.data["refresh_token"];
            setAccessToken(res.data["access_token"]);
          })
          .catch((err) => {
          });
      })
      .catch((err) => {
      });
  }, []);

  return [accessToken];
}

export default useOauth;