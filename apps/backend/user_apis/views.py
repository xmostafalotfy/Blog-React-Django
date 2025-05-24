from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import AnonymousUser


@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
  
    if not isinstance(request.user,AnonymousUser) :
        return Response({"detail": "Already logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    identifier = request.data.get('identifier')
    password = request.data.get('password')

    if not identifier or not password:
        return Response({"detail": 'Data Missing'}, status=status.HTTP_400_BAD_REQUEST)
    elif '@' in identifier :
        user = authenticate(request, email=identifier, password=password) 
    else:
        user = authenticate(request, username=identifier, password=password) 

    if user is None:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    response = Response({"detail": "Login successful"}, status=status.HTTP_200_OK)

    response.set_cookie(
        key='access_token',
        value=str(refresh.access_token),
        httponly=True,
        secure=False,
        samesite='Strict',
        max_age=8 * 60 * 60,
    )

    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        httponly=True,
        secure=False,
        samesite='Strict',
        max_age=14 * 24 * 60 * 60,
    )

    return response

@api_view(['POST'])
def logout(request):
    if request.user:
        response = Response({"detail": "Login successful"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
    return Response({"detail": "Not logged in !"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def authenticated(request):
    if not isinstance(request.user,AnonymousUser):
        return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)
    return Response({"user": None}, status=status.HTTP_401_UNAUTHORIZED)

    
