         title   lpt
.286
sseg     segment stack
         db      256 dup(?)
sseg     ends
code     segment 'code'
         assume  ss:sseg,cs:code
start:   jmp     main
main:    push    ds
         xor     ax,ax
         push    ax
         mov     ax,40h
         mov     es,ax
         mov     dx,es:[8]      ; 378h
         mov     al,0
         out     dx,al
         inc     dx
         in      al,dx
         call    bibi
         mov     ah,8
         int     21h
         dec     dx
         mov     al,11111111b
         out     dx,al
         inc     dx
         in      al,dx
         call    bibi
         mov     ah,8
         int     21h
         inc     dx
         mov     al,0
         out     dx,al
         dec     dx
         in      al,dx
         call    bibi
         mov     ah,8
         int     21h
         inc     dx
         mov     al,1
         out     dx,al
         dec     dx
         in      al,dx
         call    bibi
         mov     ah,8
         int 21h
         in      al,dx
         call    bibi
         mov     ah,8
         int     21h
         mov     ax,4c00h
         int     21h
bibi     proc    near
         push    dx
         mov     dh,10000000b
ci:      mov     dl,'0'
         push    ax
         test    al,dh
         jz      m0
         mov     dl,'1'
m0:      mov     ah,2
         int     21h
         pop     ax
         shr     dh,1
         jnz     ci
         pop     dx
         ret
bibi     endp    
code     ends
         end     start
