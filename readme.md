How to install

1) Install python
2) Install request, flask and flask_cors using pip (pip install flask, pip install request, etc.)
3) Start the API using python api.py  
You now have access to an API that handles request with a json body of the form {engravings: [engraving_name_1, engraving_name_2, ...], stats: [stat_name_1, stat_name_2, ...]}

4) Open view.html in your web browser of choice

Info : 
On view.html
- A red result means it's main stat with meta engraving
- A black result means it's main stat with off-meta engraving
- A red faded (low opacity) result means it's sub-stat with meta engraving
- A black faded result means it's sub-stat with off-meta engraving

What is main stat, sub stat, and meta vs off meta engravings ?
- Main stat means it's the stat that's used the most. For example, a Deathblade's main stat is Spec. 
- Sub stat is the stat that's used as the off stat on the necklace. It can also be used (for some rare builds) as one-of on a ring or earring. For example, a DB always run crit on necklace, and some cheapos can also run crit on a ring. So it's the sub stat for DB. However, Tai scrapper often run 50/50 crit/swift, so both crit and swift are considered main stats on that build. 
- A meta engraving is one that is used basically always at lvl 3. Most builds have 4 core engravings, and either a 5th core engraving OR 2 "it depends on what you're running for your stat distribution / set" engravings. Overall, those would sell very well.
- An off-meta engraving is one that is either only used as a +1 in a 5x3+1 setup, or that is a cheap but worse alternative. For example, Surge DBs can technically run Mass Increase but it's absolutely not recommended. You might not sell those as easily as you'd sell a meta engraving. 
