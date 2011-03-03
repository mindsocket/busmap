import httplib2
import cgi

def index(req, x, y):
    req.content_type = "text/plain"

    h = httplib2.Http()
    resp, content = h.request("http://mblapps.131500.com.au/lite/XML_DM_REQUEST?mode=direct&coordOutputFormat=WGS84&mergeDep=1&useAllStops=1&maxTimeLoop=1&canChangeMOT=0&useRealtime=1&name_dm=" + x + "%3A" + y + "%3AWGS84%3A&type_dm=coord&exclMOT_11=1&excludedMeans=checkbox&itOptionsActive=1&ptOptionsActive=1&imparedOptionsActive=1", "GET")
    return content