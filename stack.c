#include<stdio.h>

int MAXSIZE = 8;
int stack[8];
int top=-1;

int isempty()
{
	if(top == -1)
	return 1;
	else
	return 0;
	
}

int isfull()
{
	if(top == MAXSIZE)
	return 1;
	else 
	return 0;
	
}

int peek()
{
	return stack[top];
}

int pop()
{
	int data;
	
	if(!isempty())
	{
		data = stack[top];
		top = top-1;
		return data;
		
	}else{
		printf("stack is empty.\n");
		
	}
}

int push (int data)
{
	if(!isfull())
	{
	
	top = top-1;
	stack[top] = data;
}else {
	printf("stack is full");
}
}

int main(){

push(3);
push(5);
push(9);
push(1);
push(12);
push(15);

printf("ELement at top of stack: %d\n",peek());
printf("Elements: \n");


while(isempty()){
	int data = pop();
	printf("%d\n", data);
}
printf("stack full :%s\n" , isfull()?"true":"false");
printf("stack empty :%s\n" , isempty()?"true":"false");

return 0;


}
