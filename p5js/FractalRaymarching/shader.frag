precision highp float;

varying vec2 vTexCoord;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 iposition;
uniform vec3 ivue;
uniform float izoom;
uniform float iAng1;
uniform float iAng2;
uniform float iScale;
uniform int iIt;
uniform vec3 iShift;
uniform vec3 iFracCol;
uniform float iGamma;


#define MINDIST 0.00001
#define PI 3.14159265


bool fcomp(float a, float b) {//test d'égalité entre 2 floats
    const float marge = 0.01;
    return (b - marge < a && a < b + marge) ? true : false;
}

vec3 indToCol(float i) { //couleur en fonction de l'indice
    if (fcomp(i, 0.0)) return vec3(0.0, 0.0, 0.0);
    if (fcomp(i, 1.0)) return vec3(1.0, 0.0, 0.0);
    if (fcomp(i, 2.0)) return vec3(0.0, 1.0, 0.0);
    if (fcomp(i, 3.0)) return vec3(0.0, 0.0, 1.0);
    if (fcomp(i, 4.0)) return vec3(cos(time)*cos(time), cos(time + PI/3.)*cos(time + PI/3.), cos(time + PI*2./3.)*cos(time + PI*2./3.));
}

//space folding function, aka wtf this function does ?!

vec3 normFold(vec3 z, vec3 n){ //miroir plan (en gros)
    z -= n * 2.0 * min(0.0, dot(z, n)) ;
    return z;
}

vec3 mengerFold(vec3 p) {
    vec3 z = p;
	float a = min(z.x - z.y, 0.0);
	z.x -= a;
	z.y += a;
	a = min(z.x - z.z, 0.0);
	z.x -= a;
	z.z += a;
	a = min(z.y - z.z, 0.0);
	z.y -= a;
	z.z += a;
    return z;
}

vec3 rotX(vec3 z, float s, float c) {
	return vec3(z.x, c*z.y + s*z.z, c*z.z - s*z.y);
}
vec3 rotY(vec3 z, float s, float c) {
	return vec3(c*z.x - s*z.z, z.y, c*z.z + s*z.x);
}
vec3 rotZ(vec3 z, float s, float c) {
	return vec3(c*z.x + s*z.y, c*z.y - s*z.x, z.z);
}

//distance estimator classique
vec4 dPlaneI(vec3 p, vec3 pos, vec3 nor, float h, float i) {
    float d = dot(p-pos,nor) - h;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dPlane(vec3 p, float h, float i) {
    float d = p.y - h;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dTorus(vec3 p, vec3 pos, float r, float t, float i) {
    float d = length(vec2(length(p.xz - pos.xz) - r, p.y - pos.y)) - t;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dSphere(vec3 p, vec3 pos, float r, float i) {
    float d = length(p - pos) - r;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dCylinder(vec3 p, vec3 pos, float r, float h, float i){
    float dX = length(p.xz - pos.xz) - r;
    float dY = abs(p.y - pos.y) - h;
    float dE = length(vec2(max(dX,0.0), max(dY,0.0)));
    float dI = min(max(dX, dY), 0.0);
    float d = dE + dI;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dBox(vec3 p, vec3 pos, vec3 s, float i){
    vec3 diff = abs(p - pos) - s;
    float dE = length(max(diff, 0.0));
    float dI = min(max(diff.x, max(diff.y, diff.z)), 0.0);
    float d = dE + dI;
    vec3 col = indToCol(i);
    return vec4(d, col);
}

vec4 dTriangle(vec3 p, vec3 pos, float s, float i){
    vec3 z = (p - pos);
    const int it = 10;
    float Scale = 2.0;
    for(int n = 0; n < it; n++){
       if(z.x+z.y<0.) z.xy = -z.yx; // fold 1
       if(z.x+z.z<0.) z.xz = -z.zx; // fold 2
       if(z.y+z.z<0.) z.zy = -z.yz; // fold 3	
       z = z*Scale - s*(Scale-1.0);
    }

	float res = length(z) * pow(Scale, float(-(it)));

    return vec4(res - 0.003,1.0,0.0,0.0);
}

vec4 dField(vec3 p, vec3 pos, float r, float i){
    p.xz = mod(p.xz + vec2(1.5), vec2(3.0)) - vec2(1.5);
    return dSphere(p,pos,r,i);
}


vec4 dFract(vec3 p, vec3 pos, float i){
    vec3 z = (p - pos);
    const int it = 20;
    float size = 0.0001 ;
    float Scale = 2.0; 
    for(int n = 0; n < it; n++){
        z = normFold(z, normalize(vec3(sin(time/3.)*2.,1.0,0.3)));
        z = normFold(z, normalize(vec3(0.925,0.3948,0.17865)));
        z = normFold(z, normalize(vec3(0.817,-0.3864,2.56)));
        z = z*Scale - (Scale-1.0);
    }

	float res = length(z) * pow(Scale, float(-(it)));

    return vec4(res - size,1.0,0.0,0.0);
}

vec4 dFract2(vec3 p, vec3 pos, float i){
    vec3 z = (p - pos);
    int it = iIt;
    float Ang1 = iAng1 ;
    float Ang2 = iAng2;
    float Scale = iScale; 
    vec3 Shift = iShift;
    vec3 fracCol = iFracCol;
    vec3 orbit = vec3(0.0);
    for(int n = 0; n < 100; ++n){ //hard limite
        if(n == it) break;
        z.xyz = abs(z.xyz);
		z = rotZ(z, sin(Ang1), cos(Ang1));
        z = mengerFold(z);
		z = rotX(z, sin(Ang2), cos(Ang2));
        z *= Scale;
        z += Shift;
        orbit = max(orbit, z.xyz*fracCol);
    }

    z *= pow(Scale, float(-it));
    float res = dBox(z, vec3(0.0), vec3(0.00001), 0.0).x;

    return vec4(res , clamp(orbit, 0.0, 1.0));
}

vec4 min4(vec4 a, vec4 b) {
    return (a.x < b.x) ? a : b;
}

vec4 scene(vec3 p) {
    vec4 d = dFract2(p, vec3(0.0), 1.0);
    return d;
}

vec3 normal(vec3 p) {
    float dp = scene(p).x;
    float eps = 0.0001;

    float dX = scene(p + vec3(eps, 0.0, 0.0)).x - dp;
    float dY = scene(p + vec3(0.0, eps, 0.0)).x - dp;
    float dZ = scene(p + vec3(0.0, 0.0, eps)).x - dp;
    return normalize(vec3(dX, dY, dZ));
}

vec3 colorBG(vec3 rD) {
    vec3 blue = vec3(0.0157, 0.0314, 0.1765) + vec3(1.0) * (rD.y) * 0.005; //couleur du fond si ne touche rien
    float sunSize = 0.02;
    float sun = clamp(dot(rD, vec3(0.0,1.0,0.0)) -1.0 + sunSize, 0.0, 1.0);
    return blue + mix(vec3(0.0), vec3(0.9451, 0.8196, 0.1922) - blue, sun)*30.;
}

vec4 march(vec3 rO, vec3 rD, float maxDist) {
    //distance du BG
    //distance min pour toucher
    //rO origine du rayon, rD direction du rayon
    vec3 cp = rO; //current position
    float d = 0.0; //dist total parcouru
    vec4 s; //distance et couleur de la scene
    vec3 col; //couleur du rayon (couleur de la scene la plus proche au dernier pas)
    const int steps = 200;
    float mind = 1000000.;
    vec3 colMind = vec3(0.0);
    float nbIt = 0.;

    for (int i = 0; i < steps; i++) {
        nbIt += 1.0;
        cp = rO + rD * d; //met a jour cp
        s = scene(cp);
        d += s.x;
        col = s.yzw;
        //if(s.x < mind) {mind = s.x; colMind = s.yzw;}
        if (s.x < MINDIST) {
            break; //touche
        }
        if (d > maxDist) {//trop loin
            return vec4(d, /*smoothstep(0.0,1.0,colMind)*exp(-mind)*0.01 +*/ colorBG(rD));//pour rajouter du fog au tour de la scene
        } 
    }

    //ambiante occlusion, proportionelle au nombre d'etape
    float AMBIENT_OCCLUSION_STRENGTH = 0.1;
    float a = 1.0 / (1.0 + float(nbIt) * AMBIENT_OCCLUSION_STRENGTH);
	col += (1.0 - a) * vec3(-1.0,-1.0,-1.0);

    return vec4(d, col);
}

float shadowMarch(vec3 rO, vec3 rD, float maxDist){
    vec3 cp = rO; //current position
    float d = 0.0; //dist total parcouru
    vec4 s; //distance et couleur de la scene
    float mind = 1000000.;
    const int steps = 100;
    int nbIt = 0;

    for (int i = 0; i < steps; i++) {
        nbIt++;
        cp = rO + rD * d; //met a jour cp
        s = scene(cp);
        d += s.x;
        if(s.x < mind) mind = s.x;
        if (s.x < MINDIST) return 0.0; //touche
        if (d > maxDist) break; //trop loin
    }
    float val = float(steps-nbIt)/float(steps) ; //mind/distShadow;
    return min(1.0, val);
}

float lighting(vec3 p, vec3 n) {
    //p le point, n la normal de la surface en ce point
    float gamma = 0.9; 

    vec4 l = vec4(0.0, 100.0, 0.0, 1.0);
    float res = max(0.0, dot(n, normalize(l.xyz - p))) * l.w; //impacte de la lumiere * sa puissance
    res *= shadowMarch(p + n*MINDIST*5., normalize(l.xyz - p), length(l.xyz - p)); //calcule de l'ombre, true si dans l'ombre
    return res / l.w*gamma; //normaliser le niveau de lumiere
}

vec3 color(vec3 rO, vec3 rD) {//fonction principale
    const float BGdist = 50.;
    const float minDist = 0.001;//distance minimal pour considerer comme toucher la surface

    vec4 m = march(rO, rD, BGdist); //rayon tire avec distance et couleur
    vec3 col = m.yzw;
    vec3 cp = rO + rD * m.x; //current point on the surface or BG
    vec3 nor = normal(cp);
    if (m.x < BGdist) {
        col *= lighting(cp, nor) + vec3(1.0, 0.9412, 0.4078)*0.1;
    }
    col = pow(col, vec3(0.4545)); //correction pour la vision de l'oeil
    col *= iGamma;
    return col;
}

void main() {
    vec2 uv = vTexCoord * 2. - 1.;
    uv.x *= resolution.x/resolution.y;
    //vec3 rO = vec3(0.0, mouse.y, 0.0);
    //vec3 rD = normalize((vec3(uv.x, uv.y, 0.5) - rO));

    vec3 camera = iposition; //vec3(cos(mouse.x*2.*PI)*4.,0.5 + mouse.y*3., sin(mouse.x*2.*PI)*4.)*1.5;//position de la camera
    vec3 target = ivue; //vec3(0.0,0.0,0.0); //point que regarde la camera (toujours au centre)

    vec3 fwd = normalize(target - camera) ;//forward
    vec3 side = normalize(cross(vec3(0.0,1.0,0.0), fwd));
    vec3 up = cross(fwd, side);//deja normalise
    float zoom = izoom;

    vec3 rD = normalize(fwd*zoom + side*uv.x + up*uv.y);//direction du rayon

    vec3 col = color(camera, rD);

    gl_FragColor = vec4(col, 1.0);
}