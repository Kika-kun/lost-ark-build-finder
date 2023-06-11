import json
import logging


class Engraving:
    name: str
    importance: str

    def __init__(self, name, importance) -> None:
        self.name = name
        self.importance = importance

    @classmethod
    def from_dict(cls, json_engraving):
        return Engraving(json_engraving["name"], json_engraving["importance"])

    def __repr__(self) -> str:
        return f"Engraving(name='{self.name}', importance='{self.importance}')"
    
    def __dict__(self) -> dict:
        return {
            'name': self.name,
            'importance': self.importance
        }
    
    def __str__(self) -> str:
        return self.__repr__()
    
    def is_engraving(self, engraving_name: str):
        return self.name.lower() == engraving_name.lower()


class Stat:
    name: str
    importance: str

    def __init__(self, name, importance) -> None:
        self.name = name
        self.importance = importance

    @classmethod
    def from_dict(cls, json_stat):
        return Stat(json_stat["name"], json_stat["importance"])

    def __repr__(self) -> str:
        return f"Stat(name='{self.name}', importance='{self.importance}')"
    
    def __dict__(self) -> dict:
        return {
            'name': self.name,
            'importance': self.importance
        }
    
    def __str__(self) -> str:
        return self.__repr__()

    def is_stat(self, stat_name: str) -> bool:
        return self.name.lower() == stat_name.lower()


class Build:
    name: str
    engravings: list[Engraving]
    stats: list[Stat]

    def __init__(self, name, engravings, stats) -> None:
        self.name = name
        self.engravings = engravings
        self.stats = stats

    @classmethod
    def from_dict(cls, json_build):
        return Build(json_build["name"], [Engraving.from_dict(json_engraving) for json_engraving in json_build["engravings"]], [Stat.from_dict(json_stat) for json_stat in json_build["stats"]])

    def __repr__(self) -> str:
        return f"Build(name='{self.name}', engravings='{self.engravings}', stats='{self.stats}')"

    def __dict__(self) -> dict:
        return {
            'name': self.name,
            'engravings': [engraving.__dict__() for engraving in self.engravings],
            'stats': [stat.__dict__() for stat in self.stats]
        }
    
    def __str__(self) -> str:
        return self.__repr__()

    def has_stats(self, stats_wanted: list[str]) -> bool:
        for stat_wanted in stats_wanted:
            has_stat = False
            for stat in self.stats:
                if stat.is_stat(stat_wanted):
                    has_stat = True
                    break

            if not has_stat:
                return False
        return True
    
    def has_engravings(self, engravings_wanted: list[str]) -> bool:
        for engraving_wanted in engravings_wanted:
            has_engraving = False
            for engraving in self.engravings:
                if engraving.is_engraving(engraving_wanted):
                    has_engraving = True
                    break
            
            if not has_engraving:
                return False
        return True


def load_builds() -> list:
    with open("builds.json", mode="+r", encoding="utf-8") as builds_data:
        res = []
        builds = json.load(builds_data)
        for build in builds:
            logging.debug(f"parsing {build['name']}")
            res.append(Build.from_dict(build))
        return res

def filter_by_stats(builds: list[Build], stats_wanted: list[str]) -> list[Build]:
    if len(stats_wanted) == 0:
        return builds
    return [build for build in builds if build.has_stats(stats_wanted)]

def filter_by_engravings(builds:list[Build], engravings_wanted: list[str]) -> list[Build]:
    if len(engravings_wanted) == 0:
        return builds
    return [build for build in builds if build.has_engravings(engravings_wanted)]

def filter_by_engravings_and_stats(builds:list[Build], engravings_wanted: list[str], stats_wanted: list[str]) -> list[Build]:
    if len(engravings_wanted) == 0 and len(stats_wanted) == 0:
        return builds
    
    if len(engravings_wanted) == 0:
        return filter_by_stats(builds, stats_wanted)
    
    if len(stats_wanted) == 0:
        return filter_by_engravings(builds, engravings_wanted)
    
    return [build for build in builds if build.has_engravings(engravings_wanted) and build.has_stats(stats_wanted)]