from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    author_image = serializers.ImageField(source='author.img', read_only=True)
    author_full_name = serializers.SerializerMethodField()
    author_id = serializers.ReadOnlyField(source='author.id')  

    class Meta:
        model = Post
        fields = [
            'id', 
            'author_id', 
            'author_username', 
            'author_image', 
            'author_full_name', 
            'title', 
            'content', 
            'image', 
            'created_at'
        ]

    def get_author_full_name(self, obj):
        first_name = obj.author.first_name
        last_name = obj.author.last_name
        if first_name and last_name:
            return f"{first_name} {last_name}"
        elif first_name:
            return first_name
        elif last_name:
            return last_name
        else:
            return ""