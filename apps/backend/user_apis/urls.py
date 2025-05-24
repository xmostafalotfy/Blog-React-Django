from django.urls import path
from . import views

urlpatterns = [
    path('register', views.create_user, name='register'), 
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logut'), 
    path('authenticated', views.authenticated, name='authenticated'), 

    # path('<int:id>', views.details, name='specific_user'),

]
