#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>

typedef struct node Node;

struct node {
    char symbol;
    Node *next;
};

Node *createNode(Node *current, char symbol){
    Node *node = (Node *)malloc(sizeof(Node));
    node->symbol = symbol;
    node->next = NULL;
    if (current != NULL){    
        current->next = node;
    }
    return node;
}

Node *createLinkedList(char *text){
    Node *head;
    Node *current;    
    Node *next;
    int i;
    int size = strlen(text);

    // Create linked list of symbols    
    head = createNode(NULL, text[0]);
    current = head;
    for (i = 1; i <= size; i++)
    {
        current = createNode(current, text[i]);
    }

    return head;
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

Node *copyFiltered(Node *head){
    // Traverse to copy    
    Node *copyHead = createNode(NULL, head->symbol);
    Node *copyCurrent = copyHead;
    Node *current = head->next;
    int removeCounter = 0;

    while(current->next != NULL){
        if (current->symbol == 't'){
            removeCounter = 3;
        }
        if (removeCounter > 0){
            //skip
            removeCounter--;
        } else {
            copyCurrent = createNode(copyCurrent, current->symbol);
        }
        current = current->next;        
    }

    return copyHead;
}

int main(void){

    char *text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    
    Node *head = createLinkedList(text);
    Node *copyHead;
    print(head);

    copyHead = copyFiltered(head);

    print(copyHead);

    // TODO cleanup
}