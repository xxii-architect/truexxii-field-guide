Purpose: This roadmap is designed for MammothOS ingestion.
It provides structured metadata, system goals, module definitions, content categories, and operational logic extracted from the uploaded wilderness documents.

1. PROJECT IDENTITY
Project Name: True XXII Wilderness App

Category: Outdoor Skills, Survival Training, Wildlife Knowledge, Field Guides

Primary Goal: Deliver adaptive wilderness knowledge, safety guidance, and field-ready reference tools.

Secondary Goal: Integrate with True XXII Supply brand ecosystem (gear, field videos, Monday content).

2. CORE USER PROFILES
Beginner Outdoorsman — needs basic safety, navigation, gear selection.

Intermediate Explorer — needs wildlife ID, weather reading, terrain strategy.

Advanced Survivalist — needs emergency protocols, shelter building, firecraft, signaling.

Field Content Followers — consume daily/weekly wilderness facts, tips, and wildlife footage.

3. PRIMARY MODULES
Wildlife Identification

Mammals, birds, reptiles, tracks, scat, behavior patterns.

Plant Identification

Edible plants, poisonous plants, medicinal plants, seasonal growth cycles.

Weather & Terrain

Reading clouds, wind patterns, storm signs, mountain vs valley microclimates.

Emergency Preparedness

First aid, signaling, shelter, firecraft, water sourcing, navigation without tools.

Gear & Loadout Guides

Seasonal loadouts, EDC kits, go-bag setups, True XXII Supply gear integration.

Field Skills

Knot tying, map reading, stealth movement, animal encounter protocols.

Daily Field Content Engine

Monday wildlife videos

Seasonal tips

Weather-based alerts

Gear recommendations

4. CONTENT STRUCTURE (FROM UPLOADED DOCS)
Short-form tips

Long-form guides

Checklists

Emergency quick-reference cards

Field video scripts

Gear breakdowns

Wildlife encounter protocols

Plant safety sheets

Weather interpretation charts

5. SYSTEM GOALS FOR THE APP
Provide fast, offline-capable wilderness knowledge.

Deliver adaptive learning based on user skill level.

Integrate True XXII Supply gear into guides and loadouts.

Support field content creation (scripts, facts, wildlife notes).

Offer emergency-mode UI for quick access to critical info.

Maintain seasonal intelligence (fall hazards, winter prep, spring growth, summer storms).

6. Phase 6 — Agent Branch Push + PR Creation
Goal: let the agent carry a validated change all the way to a reviewable pull request,
while keeping every irreversible step behind a human gate.

Gate A — Validation run
Isolated Docker execution: baseline tests vs. candidate tests
No regression observed before proceeding
Owner approves the run with its validation digest

Gate B — Application to a new local branch
Commit lands on a new local branch only
Selected checkout, remote, and production remain untouched
Owner approves separately with the application digest

Gate C — Push the agent branch (new capability)
Push only the named agent branch; never main or a protected branch
Force-push disabled for the agent
Owner approves the push with the branch name and commit SHA displayed

Gate D — Pull request creation (new capability)
Requires a configured GitHub token with repo scope
PR body generated from the patch, test results, and validation digest
Draft PR by default
Owner approves PR creation with target branch and title displayed

Hard constraints
No merges by the agent, ever — a human performs every merge
No direct commits to main or protected branches
Each gate is a separate, explicit approval with its own digest
Gate C and Gate D approvals expire after 15 minutes
If the push succeeds but PR creation fails, report the branch and SHA so the PR can be opened manually

7. DATA MODEL (FOR MAMMOTH INGESTION)
Entities
Wildlife

Plants

WeatherPatterns

TerrainTypes

EmergencyProtocols

GearItems

Loadouts

FieldTips

SeasonalGuides

VideoScripts

Attributes
Name

Category

Region

Hazards

Identification markers

Behavior

Seasonal relevance

Required gear

Emergency actions

Notes for field content

8. APP FEATURE ROADMAP
Phase 1 — Foundation
Wildlife + plant database

Emergency quick-reference

Gear/loadout system

Basic UI

Phase 2 — Adaptive Learning
Skill-level progression

Quizzes

Personalized modules

Seasonal intelligence

Phase 3 — Field Content Engine
Monday wildlife content generator

Weather-based suggestions

Gear promo integration

Auto-script builder

Phase 4 — Offline Mode
Local caching

Emergency offline pack

Minimal UI fallback

Phase 5 — True XXII Ecosystem Integration
Gear store

Brand content

Field missions

Wilderness challenges

9. FILE PURPOSE
This roadmap file is intended for:

MammothOS ingestion

ATLAS Tutor ingestion (optional)

Wilderness App planning

Developer onboarding

Content structuring

Feature prioritization

Knowledge graph building

10. TAGS FOR MAMMOTHOS SCANNING
Code
#project:wilderness_app
#brand:true_xxii
#module:wildlife
#module:plants
#module:weather
#module:terrain
#module:emergency
#module:gear
#module:loadouts
#module:field_content
#phase:foundation
#phase:adaptive_learning
#phase:content_engine
#phase:offline_mode
#phase:ecosystem
11. NEXT STEPS
Create a file in your repo root:

Code
wilderness_app_roadmap.md
Paste the entire roadmap above into it.

MammothOS will then be able to:

scan it

classify modules

build a knowledge graph

generate tasks

generate content

support your wilderness app development

If you want, I can also generate:

wilderness_data_schema.md

true_xxii_field_content_protocol.md

wilderness_app_feature_spec.md

wilderness_app_directory_structure.md