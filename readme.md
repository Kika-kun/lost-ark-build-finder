How to install

1) Install python
2) Install request, flask and flask_cors using pip (pip install flask, pip install request, etc.)
3) Start the API using python api.py 
You now have access to an API that handles request with a json body of the form {engravings: [engraving_name_1, engraving_name_2, ...], stats: [stat_name_1, stat_name_2, ...]}

4) Open view.html in your web browser of choice

Info : 
On view.html
A red result means it's main stat with meta engraving
A black result means it's main stat with off-meta engraving
A red faded (low opacity) result means it's sub-stat with meta engraving
A black faded result means it's sub-stat with off-meta engraving