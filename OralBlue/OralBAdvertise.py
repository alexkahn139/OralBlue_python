import json 

from typing import Optional

from bluepy.btle import ScanEntry

from OralBlue.BrushMode import BrushMode
from OralBlue.BrushSector import BrushSector
from OralBlue.BrushState import BrushState


class OralBAdvertise(object):

    @staticmethod
    def buildFromScanEntry(scanEntry: ScanEntry) -> Optional["OralBAdvertise"]:
        vendorSpecificData = scanEntry.getValueText(ScanEntry.MANUFACTURER)
        parser = OralBAdvertise(vendorSpecificData)
        if parser.isValid:
            return parser
        else:
            return None

    def _extractByte(self, data: str, offset: int) -> int:
        return int(data[2 * offset: 2 * offset + 2], 16)

    def _extractShort(self, data: str, offset: int) -> int:
        return int(data[2 * offset: 2 * offset + 4], 16)

    def __init__(self, advertiseData: str):
        if len(advertiseData) not in [22, 26]:
            self._isValid = False
            return

        if self._extractShort(advertiseData,0) != 0xDC00:
            self._isValid = False
            return

        self._isValid = True

        self._protocolVersion = self._extractByte(advertiseData,2)
        self._typeId = self._extractByte(advertiseData, 3)
        self._fwVersion = self._extractByte(advertiseData,4)
        self._state = BrushState(self._extractByte(advertiseData, 5))
        self._highPressureDetected = (self._extractByte(advertiseData, 6) & 0x80) != 0
        self._hasReducedMotorSpeed = (self._extractByte(advertiseData, 6) & 0x40) != 0
        self._hasProfesionalTimer = (self._extractByte(advertiseData, 6) & 0x1) == 0
        self._brushTimeSec = self._extractByte(advertiseData,7)*60+self._extractByte(advertiseData,8)
        self._brushMode = BrushMode(self._extractByte(advertiseData,9))
        self._sector = OralBAdvertise.toBrushSecotr(self._extractByte(advertiseData,10) & 0x7)
        self._smiley = (self._extractByte(advertiseData,10) & 0x38) >> 3


    @staticmethod
    def toBrushSecotr(value:int) -> BrushSector:
        if value == 0x07:
            return BrushSector.LAST_SECTOR
        elif 0x00 <= value <= 0x06:
            return BrushSector(value-1)
        else:
            return BrushSector.NO_SECTOR

    def __str__(self):
        return str(self.__dict__)

    def __json___(self):
        return json(self.__dict__)
    @property
    def isValid(self)->bool:
        return self._isValid

    @property
    def hightPressureDetected(self) -> bool:
        return self._highPressureDetected

    @property
    def protocolVersion(self)->int:
        return self._protocolVersion

    @property
    def typeId(self)->int:
        return self._typeId

    @property
    def fwVersion(self)->int:
        return self._fwVersion

    @property
    def brushingTimeS(self)->int:
        return self._brushTimeSec

    @property
    def sector(self)->BrushSector:
        return self._sector

    @property
    def brushingMode(self)->BrushMode:
        return self._brushMode

    @property
    def state(self)->BrushState:
        return self._state

    @property
    def smiley(self)->int:
        return self._smiley

    @property
    def hasProfesionalTimer(self)->bool:
        return self._hasProfesionalTimer

    @property
    def hasReducedMotorSpeed(self)->bool:
        return self._hasReducedMotorSpeed

    def __str__(self) -> str:
        return "Status: {}\n" \
               "Brush time: {} s\n" \
               "Brush mode: {}\n" \
               "Sector: {}\n" \
               "Pressure detected: {}\n"\
               "Protocol Version: {}\n" \
               "TypeId: {}\n" \
               "Has reduced motor speed: {}\n" \
               "Has professional timer: {}\n" \
               "Smiley: {}\n"\
                .format(str(self.state), self.brushingTimeS, str(self.brushingMode), str(self.sector),
                        self.hightPressureDetected,self.protocolVersion,self.typeId,self.hasReducedMotorSpeed,
                        self.hasProfesionalTimer,self.smiley)

    def __json__(self) -> json:
        return {
            "status": self.state,
            "brushTime": self.brushingTimeS,
            "sector": self.sector
        }