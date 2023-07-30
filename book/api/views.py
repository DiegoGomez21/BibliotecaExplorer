from  rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination
from book.models import Book
from book.api.serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    #pagination_class = PageNumberPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]