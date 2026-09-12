from typing import Literal

from pydantic import BaseModel


FrictionEventType = Literal[
    "field_focus",
    "field_blur",
    "hesitation",
    "validation_error",
    "correction",
]


class FrictionEvent(BaseModel):
    id: str
    field: str
    type: FrictionEventType
    timestamp: int
    durationMs: int | None = None