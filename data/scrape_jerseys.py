import pandas as pd
import requests
from bs4 import BeautifulSoup

response = requests.get(url = "https://en.wikipedia.org/wiki/Points_classification_in_the_Tour_de_France")
soup = BeautifulSoup(response.content, "html.parser")
table = soup.find_all("table", {"class":"wikitable"})[3]
df = pd.read_html(str(table))
df = pd.DataFrame(df[0])
df = df[["Year", "Winner"]]
points = df
points["Rider"] = points["Winner"].apply(lambda row: row.split('\xa0')[0])
points = points[["Year", "Rider"]]
points

response = requests.get(url = "https://en.wikipedia.org/wiki/Mountains_classification_in_the_Tour_de_France")
soup = BeautifulSoup(response.content, "html.parser")
table = soup.find_all("table", {"class":"wikitable"})[2]
df = pd.read_html(str(table))
df = pd.DataFrame(df[0])
df = df[["Year", "Rider"]]
kom = df
kom

response = requests.get(url = "https://en.wikipedia.org/wiki/Young_rider_classification_in_the_Tour_de_France")
soup = BeautifulSoup(response.content, "html.parser")
table = soup.find_all("table", {"class":"wikitable"})[0]
df = pd.read_html(str(table))
df = pd.DataFrame(df[0])
df = df[["Year", "Rider"]]
white = df
white["Rider"] = df["Rider"].apply(lambda row: row.split('\xa0')[0])
white

df = pd.read_csv("../data/tdf_winners.csv")[["start_date", "winner_name"]]
df.columns = ["Year", "Rider"]
yellow = df
yellow["Year"] = df["Year"].apply(lambda row: row[:4])
yellow

response = requests.get(url = "https://en.wikipedia.org/wiki/Combativity_award_in_the_Tour_de_France")
soup = BeautifulSoup(response.content, "html.parser")
table = soup.find_all("table", {"class":"wikitable"})[0]
df = pd.read_html(str(table))
df = pd.DataFrame(df[0])
df = df[["Year", "Rider"]]
combativity = df
combativity["Year"] = df["Year"].apply(lambda row: row[:4])
combativity["Rider"][1] = "Lucien Lazaridès"
combativity["Rider"][2] = "François Mahé"
combativity["Rider"][57] = None
combativity

response = requests.get(url = "https://en.wikipedia.org/wiki/Combativity_award_in_the_Tour_de_France")
soup = BeautifulSoup(response.content, "html.parser")
table = soup.find_all("table", {"class":"wikitable"})[0]
df = pd.read_html(str(table))
df = pd.DataFrame(df[0])
df = df[["Year", "Rider"]]
combativity = df
combativity["Year"] = df["Year"].apply(lambda row: row[:4])
combativity["Rider"][1] = "Lucien Lazaridès"
combativity["Rider"][2] = "François Mahé"
combativity["Rider"][57] = None
combativity

response = requests.get(url = "https://en.wikipedia.org/wiki/Team_classification_in_the_Tour_de_France")
soup = BeautifulSoup(response.content, "html.parser")
tables = soup.find_all("table", {"class":"wikitable"})
df = pd.concat(pd.read_html(str(table))[0] for table in tables[0:5])
team = df
team["Team"][9] = df["Team"][9][:-3]
team["Team"][11] = df["Team"][11][:-3]
team["Team"][12] = df["Team"][12][:-3]
team["Team"][13] = df["Team"][13][:-3]
team

yellow.columns = ["Year", "Yellow"]
points.columns = ["Year", "Points"]
kom.columns = ["Year", "KOM"]
white.columns = ["Year", "White"]
team.columns = ["Year", "Team"]
combativity.columns = ["Year", "Combativity"]

yellow["Year"] = yellow["Year"].apply(lambda row: int(row))
combativity["Year"] = combativity["Year"].apply(lambda row: int(row))

jerseys = yellow.set_index("Year")
jerseys = jerseys.join(points.set_index("Year"), how="outer")
jerseys = jerseys.join(kom.set_index("Year"), how="outer")
jerseys = jerseys.join(white.set_index("Year"), how="outer")
jerseys = jerseys.join(team.set_index("Year"), how="outer")
jerseys = jerseys.join(combativity.set_index("Year"), how="outer")
jerseys = jerseys[:-2]

jerseys.to_csv("jerseys.csv")