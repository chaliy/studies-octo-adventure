
#include "Tlc5940.h"

const byte _ = 0;

const byte R = 1;
const byte Y = 2;
const byte G = 3;

const byte r = 11;
const byte g = 13;

struct SPEC {
  byte pred_c1;
  byte pred_c2;
  byte pred_p1;
  
  byte action_c1;
  byte action_c2;
  byte action_p1;

  int delay;
};

const int LONG_DELAY = 2000;
const int SHORT_DELAY = 2;

SPEC spec1 = SPEC{ Y, Y, r, R, Y, _, SHORT_DELAY };
SPEC spec2 = SPEC{ R, Y, r, R, G, _, LONG_DELAY };
SPEC spec3 = SPEC{ R, G, r, R, Y, R, SHORT_DELAY };
SPEC spec4 = SPEC{ R, Y, g, Y, Y, _, LONG_DELAY };
SPEC spec5 = SPEC{ Y, Y, g, Y, R, _, SHORT_DELAY };
SPEC spec6 = SPEC{ Y, R, g, G, R, _, LONG_DELAY };
SPEC spec7 = SPEC{ G, R, g, Y, R, G, SHORT_DELAY };
SPEC spec8 = SPEC{ Y, R, r, Y, Y, _, LONG_DELAY };

const byte SPECS_LENGTH = 8;
SPEC* specs[SPECS_LENGTH] = { &spec1, &spec2, &spec3, &spec4, &spec5, &spec6, &spec7, &spec8  };

int c1 = Y;
int c2 = Y;
int p1 = _;

void setup()
{
	Tlc.init();
}

void light(byte l, byte n){
	byte channel = (n * 3) + (l - 1);
	Tlc.set(channel, 0);
}


void loop()
{
  
  int i;
  
  // Find matching spec
  SPEC* spec;
  for(i = 0; i < SPECS_LENGTH; i++){
    if (specs[i]->pred_c1 == c1 && specs[i]->pred_c2 == c2){
      if (specs[i]->pred_p1 != _){
        if ((specs[i]->pred_p1 == r && p1 != R) || (specs[i]->pred_p1 == g && p1 != G)){
          spec = specs[i];
		  break;
        }
      } else {
        spec = specs[i];
		break;
      }
    } 
  }
  
  // Apply action
  c1 = spec->action_c1;
  c2 = spec->action_c2;
  if (spec->action_p1 != _){
    p1 = spec->action_p1;
  }

  // Light!  
  Tlc.clear();  
  Tlc.setAll(4095);

  light(c1, 0);
  light(c2, 1);
  
  Tlc.update();
  delay(spec->delay);
  
}

