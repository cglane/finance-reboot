import os

def export_vars(request):
    data = {}
    print(os.environ.get('ENVIRONMENT'), 'environ')
    data['ENVIRONMENT'] = os.environ.get('ENVIRONMENT')
    return data