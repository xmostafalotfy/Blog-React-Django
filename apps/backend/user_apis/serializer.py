from .models import User
from rest_framework import serializers
import re
import os


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'img', 'password', 'username']
        extra_kwargs = {
                        'password': {'write_only': True},
                        'email': {'required': True, 'allow_blank': False},
                        'username': {'required': True, 'allow_blank': False}
                        }
        
    def validate_first_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("Invalid Name.")
        return value
    
    def validate_username(self,value):
        username_pattern = r'^[a-zA-Z0-9_]+$'
        if not re.fullmatch(username_pattern,value):
            raise serializers.ValidationError('Contains Invalid Character')
        return value
    
    def validate_last_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("Invalid Name.")
        return value
    
    def validate_email(self, value):
        email_pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"

        if not re.fullmatch(email_pattern,value):
            raise serializers.ValidationError("Invalid Email.")
        return value
    
    def validate_img(self, value):
        if value.size > 4 * 1024 * 1024:
            raise serializers.ValidationError("Image too large. Max 4MB.")
        
        ext = os.path.splitext(value.name)[1].lower()
        valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']
        if ext not in valid_extensions:
            raise serializers.ValidationError("Invalid image extension. Allowed: jpg, jpeg, png, gif.")
        
        return value
    
    def to_internal_value(self, data):
        allowed_fields = set(self.fields.keys())
        provided_fields = set(data.keys())
        extra_fields = provided_fields - allowed_fields
        if extra_fields:
            raise serializers.ValidationError({"extra_field_errors": f"Extra fields are not allowed: {', '.join(extra_fields)}"})
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
