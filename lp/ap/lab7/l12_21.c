#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>

typedef struct node Node;

struct node {
    char symbol;
    Node *next;
};

Node *createNode(char symbol){
    Node *node = (Node *)malloc(sizeof(Node));
    node->symbol = symbol;
    node->next = NULL;
    return node;
}

void print(Node *head){
    // Traverse to print
    Node *current = head;
    while(current->next != NULL){
        printf("%c", current->symbol);              
        current = current->next;
    }
    printf("\n");
}

int findPattern(Node *head){
    // Traverse to find pattern
    Node *current = head;
    char prepre = ' ';
    char pre = ' ';    
    char cur;

    while(current->next != NULL){
        cur = current->symbol;
        if (cur == '?'){
            if (pre == '!' && prepre == '!'){
                return 1;
            }
        }  
        prepre = pre;
        pre = cur;      
        current = current->next;
    }

    return 0;
}

int main(void){
    const char text[] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    int size = strlen(text);
    int i;
    Node *head;
    Node *current;    
    Node *next;

    printf("Text size is: %d\n", size);
    
    // Create linked list of symbols    
    head = createNode(text[0]);
    current = head;
    for (i = 1; i <= size; i++)
    {
        next = createNode(text[i]);
        current->next = next;
        current = next;
    }

    print(head);

    if (findPattern(head)){
        printf("Text contains \"!!?\"\n");
    }

    // TODO cleanup
}