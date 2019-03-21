import json
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from hfl.models import (LandingContent,
                        Agent,
                        AboutPage,
                        Listing,
                        ListingImage,
                        PropertyType)
from hfl.serializers import (ListingSerializer,
                             AgentSerializer,
                             LandingContentSerializer,
                             ImageSerializer,
                             ListingDetailSerializer,
                             ListingMapSerializer,
                             AboutPageSerializer)
from rest_framework.decorators import detail_route
from rest_framework import viewsets, generics
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from rest_framework.views import APIView


class ListingImagesContentViewSet(viewsets.ReadOnlyModelViewSet):
    # queryset = LandingContent.objects.all()
    serializer_class = ImageSerializer
    queryset = ListingImage.objects.all()


class LandingContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LandingContent.objects.all()
    # queryset = LandingContent.objects.all().prefetch_related('listing')
    serializer_class = LandingContentSerializer

    # Check that request comes from our domain
    @method_decorator(csrf_exempt)
    def get_queryset(self, **kwargs):

        return super(LandingContentViewSet, self).get_queryset(**kwargs)


class ListingDetailView(generics.ListAPIView):
    serializer_class = ListingDetailSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        name = self.kwargs['name']
        if name:
            listing = Listing.objects.filter(
                street_address__iexact=name)
            if listing:
                return listing
            return Listing.objects.filter(property_name__iexact=name)
        return []

class ListMapView(generics.ListAPIView):
    serializer_class = ListingMapSerializer
    def get_queryset(self):
        return Listing.objects.exclude(status="Sold").exclude(status="Leased").exclude(status="Draft")

class ListView(generics.ListAPIView):
    serializer_class = ListingSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.

        Remove Sold from 'ALL'
        """
        property_type = self.kwargs['property_type']
        property_type_option = PropertyType.objects.filter(property_type=property_type).first()
        if property_type and property_type == 'Sold':
            return Listing.objects.filter(
                 images__isnull=False, status__in=['Sold', 'Leased'])\
                .exclude(status='Draft')\
                .distinct()
        elif property_type_option:
            return Listing.objects.filter(images__isnull=False, property_type_choices__in=[property_type_option])\
                .exclude(status='Sold')\
                .exclude(status='Leased') \
                .exclude(status='Draft') \
                .distinct()
        else:
            return Listing.objects.filter(images__isnull=False)\
                .exclude(status='Sold')\
                .exclude(status='Leased') \
                .exclude(status='Draft') \
                .distinct()

class OtherListingsView(generics.ListAPIView):
    serializer_class = ListingSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.

        Remove Sold from 'ALL'
        """
        property_type = self.kwargs['property_type']
        property_name = self.kwargs['property_name']
        if property_type:
            return Listing.objects.filter(images__isnull=False, property_type=property_type,)\
                .exclude(status='Sold')\
                .exclude(property_name=property_name)\
                .exclude(status="Draft")\
                .exclude(status='Leased')\
                .distinct()[:5]



class AgentListingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    # Check that request comes from our domain


class AboutPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutPage.objects.all()
    serializer_class = AboutPageSerializer
    # Check that request comes from our domain
