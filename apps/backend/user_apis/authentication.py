
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework import exceptions
from django.contrib.auth.backends import ModelBackend
from user_apis.models import User
from django.db.models import Q

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, username=None, **kwargs):
        try:
            user = User.objects.get(Q(email=email) | Q(username=username) )
        except User.DoesNotExist:
            return None
        if user.check_password(password):
            return user
        return None
    

class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if not raw_token:
            return None  
        
        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            return (user, validated_token)  
        except exceptions.AuthenticationFailed as e:
            raise e  