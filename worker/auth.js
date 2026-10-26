import {createRemoteJWKSet,jwtVerify} from 'jose';
const keys=new Map();
export async function authorize(request,env){
  if(!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(env.ACCESS_TEAM_DOMAIN||'')||!env.ACCESS_AUD||!env.ADMIN_EMAILS) throw Error('Access not configured');
  const issuer=`https://${env.ACCESS_TEAM_DOMAIN}`;
  if(!keys.has(issuer)) keys.set(issuer,createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`)));
  const token=request.headers.get('Cf-Access-Jwt-Assertion');
  if(!token) throw Error('Access required');
  const {payload}=await jwtVerify(token,keys.get(issuer),{issuer,audience:env.ACCESS_AUD,algorithms:['RS256'],requiredClaims:['exp','email','sub']});
  const allowed=env.ADMIN_EMAILS.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
  if(typeof payload.email!=='string'||!allowed.includes(payload.email.toLowerCase())) throw Error('Not authorized');
  return payload.email.toLowerCase();
}
