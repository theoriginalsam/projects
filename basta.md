#include<stdio.h>

#include<stdbool.h>

int main()
{
	int i, size , element, *p;
	bool found;
	
	printf("enter size of array");
	scanf("%d",&size);
	
	p=(int*)calloc(size,sizeof(int));
	
	printf("enter data");
	for(i=0; i<size ; i++)
	{
		scanf("%d",&*(p+i));
	}
	printf("enter the element you want to know the position");
	scanf("%d",&element);
	
	for (i=0; i<size ; i++)
	{
		if(*(p+i))==element)
		{
			printf("the element is in %d position",i);
			found true;
			
		}
	}
	if(!found)
	{
		printf("invalid number");
	}
}
