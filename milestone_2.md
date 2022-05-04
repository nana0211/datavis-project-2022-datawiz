# Core Visualization

Our primary interest was to visualize Tour de France structurally, a famous yearly bike race, as stated in milestone one. The visualization will be presented in a map and a sidebar. Specifically, the map presents the basic geometric information (e.g., Starting Point and End Point) of all stages per edition as represented in the first figure. A slider will be shown on the map to slide over the years. In addition, the map can be zoomed in for detailed information on a specific part of a route/stage.
Moreover, zoom out to get a general overview of stages within a year. In addition to the map, we will present a sidebar on the left side of the map, and the sidebar includes detailed text information organized by two tabs (Edition and Stages). The sidebar firstly shows general information on the race for that year and general information for a stage when the user selects it on the map, as shown in image 2. The detailed core information for every year and stage includes total distance, winning information (winner, finishing time, nationality, etc.), altitude gain, and final results.
The edition tab gives basic edition information, general classification, and who won what classification (points jersey, yellow jersey). At the same time, the stages tab lists stage information and expandable results containing a summary of position, name, team, time, and state. Users can interact with the visualization in three ways:
1. As aforementioned, zoom in and out of the map
2. Choose a specific year by the slider on the map or using the drop down menu in the sidebar
3. Select a stage by clicking on the map or through the drop-down list on the stages tab.

![sketch_edition](/images/sketch_edition.jpg)
![sketch_stages](/images/sketch_stages.jpg)

# Tools and Lectures for the core visualisation
For the core visualisation, we use the following tools:
1. [Leaflet](https://leafletjs.com/) for the interactive map. We use the [leaflet-sidebar-v2](https://github.com/noerw/leaflet-sidebar-v2) plugin to add a sidebar to the map, which will be used to display additional information and to interact with the map.
2. [d3js](https://d3js.org/)'s elements are overlaid on top of the Leaflet map. More specifically, these elements are the markers displaying the stages' endpoints, and the links between these markers.
3. [Fontawesome](https://fontawesome.com) for icons

The most important lectures for this core visualisation will be the ones on Maps and on Practical Maps, while keeping in mind the lecture on the Do's and Don'ts in Viz.

# Potential Extra Visualization
To make the visualization juicier, we proposed extra visualization. For example, we can add a progression chart for each edition, showing who is ahead at each stage. The chart could be presented on top of the map with a click. In addition, we can also offer options to compare cities, for example, which city held the most numbers of races/stages. Another interesting visualization is to color/label different stage types. For example, the ones in the mountains can be grey or with a small mountain label. Furthermore, we could add filters for users to pinpoint their interested race. For example, filters for years could be years with at least x distance, at least x stages, etc.; filters for stages could be overall editions or one edition. Finally, the map can be changed into a heat map, possibly by a button click to display all the stages' locations combined; users can see the most popular cities and the least.

# Beyond the extra
Beyond the extra visualization, we might add an extra tab or directly display texts on the map to show information per start/end town, such as a list of starters, the number of stages to/from overall editions, and a list of winners, first appearance, etc. What is more interesting is to provide searches for one particular racer and all its related results. However, this information is a little beyond the scale of the core visualization that we may not consider in the final version.

# Project prototype
A skeleton of our visualisation is available [here](https://com-480-data-visualization.github.io/datavis-project-2022-datawiz/website/html/prototype.html)
