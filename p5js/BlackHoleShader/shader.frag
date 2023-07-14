precision mediump float;

varying vec2 vTexCoord;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D texture;


vec4 getPixCol(vec3 pos) {
    vec2 uv = vec2(atan(pos.x, pos.z) / (2.0 * 3.141592), acos(pos.y) / 3.141592); //sphere to plan
    float zoom = 0.72 + mouse.y/20.;
    float up = (time * 0.1) ; //decalage
    float left = 0.4;//decalage
    return texture2D(texture, vec2(mod(uv.y * zoom + up, 1.0)+0.5, mod(uv.x * 17. * zoom + left, 1.0)));
}

float rnd(vec2 uv) {
    return mod(uv.x * 15418. + uv.y * 12458., 0.1);
}

void main() {
    vec2 uv = vTexCoord; //uv entre 0 et 1 pour x et y
    uv = uv * 2. - 1.;

    vec3 pos = vec3(uv.xy, 0.0 + rnd(uv) * 0.4); //+ petite variation pour antialiasing 
    vec3 speed = vec3(0.0, 0.0, 40.0); //vitesse de la lumiere non constante
    const float lightWeight = 20.; //oui oui

    const float BHm = 1.;//masse du BH + G
    vec3 BHpos = vec3(0.0, sin(time * 0.4) * 0.0, 1.0);
    float Rs = (2. * BHm / length(speed)) * 2.;//rayon de s

    const int nbStep = 500;
    const float dt = 0.001;
    float BGdepth = 4.; //profondeur de la scene

    for (int i = 0; i < nbStep; i++) {
        vec3 Fdir = normalize(vec3(BHpos - pos));
        float force = BHm * lightWeight * (1. / (pow(length(vec3(BHpos - pos)), 2.)));
        vec3 acc = Fdir * force;
        speed = speed + acc * dt;
        pos = pos + speed * dt;

        if (length((BHpos - pos)) < Rs) {
            gl_FragColor = vec4(0.0,0.0,0.0, 1.0);
            return;
        }

        if (length(BHpos - pos) >= BGdepth) {
            gl_FragColor = getPixCol(vec3(pos.zxy));
            return;
        }
    }

    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);//si pb
}