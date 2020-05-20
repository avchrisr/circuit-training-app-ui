import axios from 'axios'
import auth from './auth'

export default {
    async getUserInfo() {
        const jwtToken = auth.auth.getSignInUserSession().getAccessToken().jwtToken
        const USERINFO_URL = 'https://' + auth.auth.getAppWebDomain() + '/oauth2/userInfo'
        const requestData = {
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        }
        const response = await axios.get(USERINFO_URL, requestData)

        console.log('------  jwtToken  -------')
        console.log(jwtToken)

        console.log('------  USERINFO_URL  -------')
        console.log(USERINFO_URL)

        console.log('------  response  -------')
        console.log(response)

        // response.data ------
        // { "sub": "65414eb2-fafa-4200-a44c-5223787031c5", "email_verified": "true", "email": "chris@everguard.ai", "username": "65414eb2-fafa-4200-a44c-5223787031c5" }

        return response.data
    }
}

// decoded JWT TOKEN stores user info, INCLUDING User Groups (Roles)
/*
{
  "sub": "65414eb2-fafa-4200-a44c-5223787031c5",
  "cognito:groups": [
    "managers",
    "administrators"
  ],
  "iss": "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_rXPhZ5xJt",
  "version": 2,
  "client_id": "rg9rqpm39gm9miohb4jeftg43",
  "event_id": "f490a334-27c1-46dd-a6e5-4c6239b4d8c6",
  "token_use": "access",
  "scope": "openid email",
  "auth_time": 1589150935,
  "exp": 1589154535,
  "iat": 1589150935,
  "jti": "050ad818-a54b-4b00-977c-054027b94c68",
  "username": "65414eb2-fafa-4200-a44c-5223787031c5"
}
*/
