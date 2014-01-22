        title   timer

WAIT_SPAN equ 50 ; Should be microseconds, but in dosbox it looks morelike seconds
TONE equ 1193 ; 1kHZ

sseg    segment stack
        db      256 dup(?)
sseg    ends

dseg    segment
        ws  dd   WAIT_SPAN
dseg    ends

cseg    segment
        assume  ss:sseg,cs:cseg,ds:dseg
start:  jmp main
main:   push   ds 
        mov    ax,0
        push   ax
        mov    ax,dseg
        mov    ds,ax

        ; Enable timer
        mov    al,10110110b
        out    43h,al
        mov    ax,TONE
        out    42h,al
        mov    al,ah
        out    42h,al

        ; Turn on speaker
        in     al,61h
        or     al,11b
        out    61h,al

        ; Wait
        mov    cx,word ptr ws
        mov    dx,word ptr ws+2
        mov    ah,86h
        int    15h

        ; Tuen off speaker
        in     al,61h
        and    al,11111100b
        out    61h,al

        ; Exit
        mov    ax,4c00h
        int    21h 
cseg    ends
        end start
