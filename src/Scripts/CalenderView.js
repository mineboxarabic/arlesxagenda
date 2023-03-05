import { useEffect, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import Arrow from "../Images/Arrow.png";
import ArrowLeft from "../Images/ArrowLeft.png";
import CulumnImage from "../Images/Column.png"
import { render } from "@testing-library/react";
import Background3 from "../Images/Background3.png";
import Data from "../Data/events-arles-small.json"
/*
 {
            "uid": 2613221,
            "slug": "luma-discussion-with-the-artist-gary-hill",
            "canonicalUrl": "https://openagenda.com/arles-agenda/events/luma-discussion-with-the-artist-gary-hill",
            "title": {
                "en": "LUMA/ Gary Hill : Circular Breathing",
                "fr": "LUMA / Gary Hill : Circular Breathing"
            },
            "description": {
                "en": "In Circular Breathing, there is the sense of a disturbing narrative accumulating and dissipating through each successive set of scenes.",
                "fr": "Dans Circular Breathing, le sentiment d'une troublante intrigue s’agrège et se dissipe au fil des séries de scènes successives."
            },
            "longDescription": {
                "en": "### **In** _**Circular Breathing**_**, there is the sense of a disturbing narrative accumulating and dissipating through each successive set of scenes.**\n\nImages from the streets of Tangier, a ship on the open sea and the interior of a mosque juxtapose with a man chopping wood and a cigarette burning slowly in an ashtray. An older woman reading and large thick hands loading a pistol unfold next to bladed stems and a close-up of an insect dragging its prey. Throughout all the segments, there is the recurring image of a woman’s hands playing a piano. The music, however, distorted by the changes of speed, can be identified as _Vexations_ by Eric Satie.\n\nThe title of _Circular Breathing_ comes from a technique that horn and reed instrument players use to play a continuous note, seemingly without taking a breath. This notion is drawn upon with the visualization of long sequences composed of five discreet scenes that migrate onto the projection field with mathematical precision.\n\n_Courtesy of the Emanuel Hoffmann Foundation._",
                "fr": "### **Dans** _**Circular Breathing**_**, le sentiment d'une troublante intrigue s’agrège et se dissipe au fil des séries de scènes successives.**\n\nDes images des rues de Tanger, d’un navire en haute mer et de l’intérieur d’une mosquée se juxtaposent à celles d’un homme coupant du bois et d’une cigarette se consumant lentement dans un cendrier. Une femme âgée toute à sa lecture et de grandes mains épaisses chargeant un pistolet se dévoilent au côté de brins d’herbe et d’un insecte en gros plan traînant sa proie. D’un bout à l’autre de ces segments réapparaissent les mains d’une femme au piano. La musique, quoique faussée par les changements de vitesse, peut être identifiée comme _Vexations_ d’Erik Satie.\n\nLe titre _Circular Breathing_ (respiration circulaire) renvoie à une technique pratiquée par les joueurs de cor et d'instruments à anche afin de tenir une note sans reprendre son souffle. Cette notion est ici utilisée dans la représentation de longues séquences composées de cinq scènes distinctes qui migrent vers le champ de la projection avec une précision mathématique.\n\n_Avec l’aimable autorisation de la Emanuel Hoffmann Foundation._"
            },
            "keywords": {
                "en": [
                    "luma",
                    "Frank gehry",
                    "exhibition",
                    "free"
                ],
                "fr": [
                    "luma",
                    "frank gehry",
                    "exposition",
                    "gratuit"
                ]
            },
            "html": {
                "en": "<h3><strong>In</strong> <em><strong>Circular Breathing</strong></em><strong>, there is the sense of a disturbing narrative accumulating and dissipating through each successive set of scenes.</strong></h3>\n<p></p>\n<p>Images from the streets of Tangier, a ship on the open sea and the interior of a mosque juxtapose with a man chopping wood and a cigarette burning slowly in an ashtray. An older woman reading and large thick hands loading a pistol unfold next to bladed stems and a close-up of an insect dragging its prey. Throughout all the segments, there is the recurring image of a woman’s hands playing a piano. The music, however, distorted by the changes of speed, can be identified as <em>Vexations</em> by Eric Satie.</p>\n<p></p>\n<p>The title of <em>Circular Breathing</em> comes from a technique that horn and reed instrument players use to play a continuous note, seemingly without taking a breath. This notion is drawn upon with the visualization of long sequences composed of five discreet scenes that migrate onto the projection field with mathematical precision.</p>\n<p></p>\n<p><em>Courtesy of the Emanuel Hoffmann Foundation.</em></p>\n",
                "fr": "<h3><strong>Dans</strong> <em><strong>Circular Breathing</strong></em><strong>, le sentiment d'une troublante intrigue s’agrège et se dissipe au fil des séries de scènes successives.</strong></h3>\n<p></p>\n<p>Des images des rues de Tanger, d’un navire en haute mer et de l’intérieur d’une mosquée se juxtaposent à celles d’un homme coupant du bois et d’une cigarette se consumant lentement dans un cendrier. Une femme âgée toute à sa lecture et de grandes mains épaisses chargeant un pistolet se dévoilent au côté de brins d’herbe et d’un insecte en gros plan traînant sa proie. D’un bout à l’autre de ces segments réapparaissent les mains d’une femme au piano. La musique, quoique faussée par les changements de vitesse, peut être identifiée comme <em>Vexations</em> d’Erik Satie.</p>\n<p></p>\n<p>Le titre <em>Circular Breathing</em> (respiration circulaire) renvoie à une technique pratiquée par les joueurs de cor et d'instruments à anche afin de tenir une note sans reprendre son souffle. Cette notion est ici utilisée dans la représentation de longues séquences composées de cinq scènes distinctes qui migrent vers le champ de la projection avec une précision mathématique.</p>\n<p></p>\n<p><em>Avec l’aimable autorisation de la Emanuel Hoffmann Foundation.</em></p>\n"
            },
            "longDescriptionLinks": [],
            "image": "https://cibul.s3.amazonaws.com/04d60d6bc7984945b7c9ec5ad7b3063b.base.image.jpg",
            "thumbnail": "https://cibul.s3.amazonaws.com/04d60d6bc7984945b7c9ec5ad7b3063b.thumb.image.jpg",
            "originalImage": "https://cibul.s3.amazonaws.com/04d60d6bc7984945b7c9ec5ad7b3063b.full.image.jpg",
            "age": null,
            "accessibility": [],
            "updatedAt": "2023-01-26T08:59:58.000Z",
            "createdAt": "2022-09-16T12:58:59.000Z",
            "range": {
                "ar": "٢٣ سبتمبر ٢٠٢٢ - ١ مايو ٢٠٢٣",
                "de": "23 September 2022 - 1 Mai 2023",
                "en": "23 September 2022 - 1 May 2023",
                "it": "23 settembre 2022 - 1 maggio 2023",
                "fr": "23 septembre 2022 - 1 mai 2023",
                "es": "23 septiembre 2022 - 1 mayo 2023"
            },
            "location": {
                "uid": 7593071,
                "name": "Parc des Ateliers, Luma Arles",
                "slug": "parc-des-ateliers-luma-arles",
                "address": "33, boulevard Victor Hugo, 13200 Arles",
                "image": null,
                "imageCredits": null,
                "postalCode": "13200",
                "city": "Pont-de-Crau",
                "district": null,
                "department": "Bouches-du-Rhône",
                "region": "Provence-Alpes-Côte d'Azur",
                "latitude": 43.674677,
                "longitude": 4.635294,
                "description": {},
                "access": {},
                "countryCode": "fr",
                "website": null,
                "email": null,
                "links": [],
                "insee": "13004",
                "phone": null,
                "tags": null,
                "timezone": "Europe/Paris",
                "updatedAt": "2022-08-10T11:21:26.000Z",
                "extId": null,
                "country": {
                    "de": "Frankreich (Metropolitan)",
                    "code": "FR",
                    "oc": "França (Metropolitana)",
                    "en": "France (Metropolitan)",
                    "it": "Francia (continente)",
                    "fr": "France (Métropole)",
                    "es": "Francia (Metropolitana)"
                }
            },
            "attendanceMode": 1,
            "onlineAccessLink": null,
            "status": 1,
            "imageCredits": "Reilly Donovan",
            "origin": {
                "uid": 99501607,
                "title": "Arles agenda",
                "oaUrl": "https://openagenda.com/agendas/99501607"
            },
            "conditions": {
                "en": "Free upon reservation",
                "fr": "Gratuit sur réservation"
            },
            "registrationUrl": "https://www.luma.org/shop/details.html?product=60bf345cc370236ae98135e8",
            "locationName": "Parc des Ateliers, Luma Arles",
            "locationUid": 7593071,
            "address": "33, boulevard Victor Hugo, 13200 Arles",
            "postalCode": "13200",
            "city": "Pont-de-Crau",
            "district": null,
            "department": "Bouches-du-Rhône",
            "region": "Provence-Alpes-Côte d'Azur",
            "latitude": 43.674677,
            "longitude": 4.635294,
            "timings": [
                {
                    "start": "2022-09-23T08:00:00.000Z",
                    "end": "2022-09-23T16:00:00.000Z"
                },
                {
                    "start": "2022-09-24T08:00:00.000Z",
                    "end": "2022-09-24T16:00:00.000Z"
                },
                {
                    "start": "2022-09-25T08:00:00.000Z",
                    "end": "2022-09-25T16:00:00.000Z"
                },
                {
                    "start": "2022-09-26T08:00:00.000Z",
                    "end": "2022-09-26T16:00:00.000Z"
                },
                {
                    "start": "2022-09-28T08:00:00.000Z",
                    "end": "2022-09-28T16:00:00.000Z"
                },
                {
                    "start": "2022-09-29T08:00:00.000Z",
                    "end": "2022-09-29T16:00:00.000Z"
                },
                {
                    "start": "2022-09-30T08:00:00.000Z",
                    "end": "2022-09-30T16:00:00.000Z"
                },
                {
                    "start": "2022-10-01T08:00:00.000Z",
                    "end": "2022-10-01T16:00:00.000Z"
                },
                {
                    "start": "2022-10-02T08:00:00.000Z",
                    "end": "2022-10-02T16:00:00.000Z"
                },
                {
                    "start": "2022-10-03T08:00:00.000Z",
                    "end": "2022-10-03T16:00:00.000Z"
                },
                {
                    "start": "2022-10-05T08:00:00.000Z",
                    "end": "2022-10-05T16:00:00.000Z"
                },
                {
                    "start": "2022-10-06T08:00:00.000Z",
                    "end": "2022-10-06T16:00:00.000Z"
                },
                {
                    "start": "2022-10-07T08:00:00.000Z",
                    "end": "2022-10-07T16:00:00.000Z"
                },
                {
                    "start": "2022-10-08T08:00:00.000Z",
                    "end": "2022-10-08T16:00:00.000Z"
                },
                {
                    "start": "2022-10-09T08:00:00.000Z",
                    "end": "2022-10-09T16:00:00.000Z"
                },
                {
                    "start": "2022-10-10T08:00:00.000Z",
                    "end": "2022-10-10T16:00:00.000Z"
                },
                {
                    "start": "2022-10-12T08:00:00.000Z",
                    "end": "2022-10-12T16:00:00.000Z"
                },
                {
                    "start": "2022-10-13T08:00:00.000Z",
                    "end": "2022-10-13T16:00:00.000Z"
                },
                {
                    "start": "2022-10-14T08:00:00.000Z",
                    "end": "2022-10-14T16:00:00.000Z"
                },
                {
                    "start": "2022-10-15T08:00:00.000Z",
                    "end": "2022-10-15T16:00:00.000Z"
                },
                {
                    "start": "2022-10-16T08:00:00.000Z",
                    "end": "2022-10-16T16:00:00.000Z"
                },
                {
                    "start": "2022-10-17T08:00:00.000Z",
                    "end": "2022-10-17T16:00:00.000Z"
                },
                {
                    "start": "2022-10-19T08:00:00.000Z",
                    "end": "2022-10-19T16:00:00.000Z"
                },
                {
                    "start": "2022-10-20T08:00:00.000Z",
                    "end": "2022-10-20T16:00:00.000Z"
                },
                {
                    "start": "2022-10-21T08:00:00.000Z",
                    "end": "2022-10-21T16:00:00.000Z"
                },
                {
                    "start": "2022-10-22T08:00:00.000Z",
                    "end": "2022-10-22T16:00:00.000Z"
                },
                {
                    "start": "2022-10-23T08:00:00.000Z",
                    "end": "2022-10-23T16:00:00.000Z"
                },
                {
                    "start": "2022-10-24T08:00:00.000Z",
                    "end": "2022-10-24T16:00:00.000Z"
                },
                {
                    "start": "2022-10-26T08:00:00.000Z",
                    "end": "2022-10-26T16:00:00.000Z"
                },
                {
                    "start": "2022-10-27T08:00:00.000Z",
                    "end": "2022-10-27T16:00:00.000Z"
                },
                {
                    "start": "2022-10-28T08:00:00.000Z",
                    "end": "2022-10-28T16:00:00.000Z"
                },
                {
                    "start": "2022-10-29T08:00:00.000Z",
                    "end": "2022-10-29T16:00:00.000Z"
                },
                {
                    "start": "2022-10-30T09:00:00.000Z",
                    "end": "2022-10-30T17:00:00.000Z"
                },
                {
                    "start": "2022-10-31T09:00:00.000Z",
                    "end": "2022-10-31T17:00:00.000Z"
                },
                {
                    "start": "2022-11-02T09:00:00.000Z",
                    "end": "2022-11-02T17:00:00.000Z"
                },
                {
                    "start": "2022-11-03T09:00:00.000Z",
                    "end": "2022-11-03T17:00:00.000Z"
                },
                {
                    "start": "2022-11-04T09:00:00.000Z",
                    "end": "2022-11-04T17:00:00.000Z"
                },
                {
                    "start": "2022-11-05T09:00:00.000Z",
                    "end": "2022-11-05T17:00:00.000Z"
                },
                {
                    "start": "2022-11-06T09:00:00.000Z",
                    "end": "2022-11-06T17:00:00.000Z"
                },
                {
                    "start": "2022-11-07T09:00:00.000Z",
                    "end": "2022-11-07T17:00:00.000Z"
                },
                {
                    "start": "2022-11-09T09:00:00.000Z",
                    "end": "2022-11-09T17:00:00.000Z"
                },
                {
                    "start": "2022-11-10T09:00:00.000Z",
                    "end": "2022-11-10T17:00:00.000Z"
                },
                {
                    "start": "2022-11-11T09:00:00.000Z",
                    "end": "2022-11-11T17:00:00.000Z"
                },
                {
                    "start": "2022-11-12T09:00:00.000Z",
                    "end": "2022-11-12T17:00:00.000Z"
                },
                {
                    "start": "2022-11-13T09:00:00.000Z",
                    "end": "2022-11-13T17:00:00.000Z"
                },
                {
                    "start": "2022-11-14T09:00:00.000Z",
                    "end": "2022-11-14T17:00:00.000Z"
                },
                {
                    "start": "2022-11-16T09:00:00.000Z",
                    "end": "2022-11-16T17:00:00.000Z"
                },
                {
                    "start": "2022-11-17T09:00:00.000Z",
                    "end": "2022-11-17T17:00:00.000Z"
                },
                {
                    "start": "2022-11-18T09:00:00.000Z",
                    "end": "2022-11-18T17:00:00.000Z"
                },
                {
                    "start": "2022-11-19T09:00:00.000Z",
                    "end": "2022-11-19T17:00:00.000Z"
                },
                {
                    "start": "2022-11-20T09:00:00.000Z",
                    "end": "2022-11-20T17:00:00.000Z"
                },
                {
                    "start": "2022-11-21T09:00:00.000Z",
                    "end": "2022-11-21T17:00:00.000Z"
                },
                {
                    "start": "2022-11-23T09:00:00.000Z",
                    "end": "2022-11-23T17:00:00.000Z"
                },
                {
                    "start": "2022-11-24T09:00:00.000Z",
                    "end": "2022-11-24T17:00:00.000Z"
                },
                {
                    "start": "2022-11-25T09:00:00.000Z",
                    "end": "2022-11-25T17:00:00.000Z"
                },
                {
                    "start": "2022-11-26T09:00:00.000Z",
                    "end": "2022-11-26T17:00:00.000Z"
                },
                {
                    "start": "2022-11-27T09:00:00.000Z",
                    "end": "2022-11-27T17:00:00.000Z"
                },
                {
                    "start": "2022-11-28T09:00:00.000Z",
                    "end": "2022-11-28T17:00:00.000Z"
                },
                {
                    "start": "2022-11-30T09:00:00.000Z",
                    "end": "2022-11-30T17:00:00.000Z"
                },
                {
                    "start": "2022-12-01T09:00:00.000Z",
                    "end": "2022-12-01T17:00:00.000Z"
                },
                {
                    "start": "2022-12-02T09:00:00.000Z",
                    "end": "2022-12-02T17:00:00.000Z"
                },
                {
                    "start": "2022-12-03T09:00:00.000Z",
                    "end": "2022-12-03T17:00:00.000Z"
                },
                {
                    "start": "2022-12-04T09:00:00.000Z",
                    "end": "2022-12-04T17:00:00.000Z"
                },
                {
                    "start": "2022-12-05T09:00:00.000Z",
                    "end": "2022-12-05T17:00:00.000Z"
                },
                {
                    "start": "2022-12-07T09:00:00.000Z",
                    "end": "2022-12-07T17:00:00.000Z"
                },
                {
                    "start": "2022-12-08T09:00:00.000Z",
                    "end": "2022-12-08T17:00:00.000Z"
                },
                {
                    "start": "2022-12-09T09:00:00.000Z",
                    "end": "2022-12-09T17:00:00.000Z"
                },
                {
                    "start": "2022-12-10T09:00:00.000Z",
                    "end": "2022-12-10T17:00:00.000Z"
                },
                {
                    "start": "2022-12-11T09:00:00.000Z",
                    "end": "2022-12-11T17:00:00.000Z"
                },
                {
                    "start": "2022-12-12T09:00:00.000Z",
                    "end": "2022-12-12T17:00:00.000Z"
                },
                {
                    "start": "2022-12-14T09:00:00.000Z",
                    "end": "2022-12-14T17:00:00.000Z"
                },
                {
                    "start": "2022-12-15T09:00:00.000Z",
                    "end": "2022-12-15T17:00:00.000Z"
                },
                {
                    "start": "2022-12-16T09:00:00.000Z",
                    "end": "2022-12-16T17:00:00.000Z"
                },
                {
                    "start": "2022-12-17T09:00:00.000Z",
                    "end": "2022-12-17T17:00:00.000Z"
                },
                {
                    "start": "2022-12-18T09:00:00.000Z",
                    "end": "2022-12-18T17:00:00.000Z"
                },
                {
                    "start": "2022-12-19T09:00:00.000Z",
                    "end": "2022-12-19T17:00:00.000Z"
                },
                {
                    "start": "2022-12-21T09:00:00.000Z",
                    "end": "2022-12-21T17:00:00.000Z"
                },
                {
                    "start": "2022-12-22T09:00:00.000Z",
                    "end": "2022-12-22T17:00:00.000Z"
                },
                {
                    "start": "2022-12-23T09:00:00.000Z",
                    "end": "2022-12-23T17:00:00.000Z"
                },
                {
                    "start": "2022-12-24T09:00:00.000Z",
                    "end": "2022-12-24T17:00:00.000Z"
                },
                {
                    "start": "2022-12-25T09:00:00.000Z",
                    "end": "2022-12-25T17:00:00.000Z"
                },
                {
                    "start": "2022-12-26T09:00:00.000Z",
                    "end": "2022-12-26T17:00:00.000Z"
                },
                {
                    "start": "2022-12-28T09:00:00.000Z",
                    "end": "2022-12-28T17:00:00.000Z"
                },
                {
                    "start": "2022-12-29T09:00:00.000Z",
                    "end": "2022-12-29T17:00:00.000Z"
                },
                {
                    "start": "2022-12-30T09:00:00.000Z",
                    "end": "2022-12-30T17:00:00.000Z"
                },
                {
                    "start": "2022-12-31T09:00:00.000Z",
                    "end": "2022-12-31T17:00:00.000Z"
                },
                {
                    "start": "2023-01-01T09:00:00.000Z",
                    "end": "2023-01-01T17:00:00.000Z"
                },
                {
                    "start": "2023-01-02T09:00:00.000Z",
                    "end": "2023-01-02T17:00:00.000Z"
                },
                {
                    "start": "2023-01-04T09:00:00.000Z",
                    "end": "2023-01-04T17:00:00.000Z"
                },
                {
                    "start": "2023-01-05T09:00:00.000Z",
                    "end": "2023-01-05T17:00:00.000Z"
                },
                {
                    "start": "2023-01-06T09:00:00.000Z",
                    "end": "2023-01-06T17:00:00.000Z"
                },
                {
                    "start": "2023-01-07T09:00:00.000Z",
                    "end": "2023-01-07T17:00:00.000Z"
                },
                {
                    "start": "2023-01-08T09:00:00.000Z",
                    "end": "2023-01-08T17:00:00.000Z"
                },
                {
                    "start": "2023-01-09T09:00:00.000Z",
                    "end": "2023-01-09T17:00:00.000Z"
                },
                {
                    "start": "2023-01-11T09:00:00.000Z",
                    "end": "2023-01-11T17:00:00.000Z"
                },
                {
                    "start": "2023-01-12T09:00:00.000Z",
                    "end": "2023-01-12T17:00:00.000Z"
                },
                {
                    "start": "2023-01-13T09:00:00.000Z",
                    "end": "2023-01-13T17:00:00.000Z"
                },
                {
                    "start": "2023-01-14T09:00:00.000Z",
                    "end": "2023-01-14T17:00:00.000Z"
                },
                {
                    "start": "2023-01-15T09:00:00.000Z",
                    "end": "2023-01-15T17:00:00.000Z"
                },
                {
                    "start": "2023-01-16T09:00:00.000Z",
                    "end": "2023-01-16T17:00:00.000Z"
                },
                {
                    "start": "2023-01-18T09:00:00.000Z",
                    "end": "2023-01-18T17:00:00.000Z"
                },
                {
                    "start": "2023-01-19T09:00:00.000Z",
                    "end": "2023-01-19T17:00:00.000Z"
                },
                {
                    "start": "2023-01-20T09:00:00.000Z",
                    "end": "2023-01-20T17:00:00.000Z"
                },
                {
                    "start": "2023-01-21T09:00:00.000Z",
                    "end": "2023-01-21T17:00:00.000Z"
                },
                {
                    "start": "2023-01-22T09:00:00.000Z",
                    "end": "2023-01-22T17:00:00.000Z"
                },
                {
                    "start": "2023-01-25T09:00:00.000Z",
                    "end": "2023-01-25T17:00:00.000Z"
                },
                {
                    "start": "2023-01-26T09:00:00.000Z",
                    "end": "2023-01-26T17:00:00.000Z"
                },
                {
                    "start": "2023-01-27T09:00:00.000Z",
                    "end": "2023-01-27T17:00:00.000Z"
                },
                {
                    "start": "2023-01-28T09:00:00.000Z",
                    "end": "2023-01-28T17:00:00.000Z"
                },
                {
                    "start": "2023-01-29T09:00:00.000Z",
                    "end": "2023-01-29T17:00:00.000Z"
                },
                {
                    "start": "2023-02-01T09:00:00.000Z",
                    "end": "2023-02-01T17:00:00.000Z"
                },
                {
                    "start": "2023-02-02T09:00:00.000Z",
                    "end": "2023-02-02T17:00:00.000Z"
                },
                {
                    "start": "2023-02-03T09:00:00.000Z",
                    "end": "2023-02-03T17:00:00.000Z"
                },
                {
                    "start": "2023-02-04T09:00:00.000Z",
                    "end": "2023-02-04T17:00:00.000Z"
                },
                {
                    "start": "2023-02-05T09:00:00.000Z",
                    "end": "2023-02-05T17:00:00.000Z"
                },
                {
                    "start": "2023-02-08T09:00:00.000Z",
                    "end": "2023-02-08T17:00:00.000Z"
                },
                {
                    "start": "2023-02-09T09:00:00.000Z",
                    "end": "2023-02-09T17:00:00.000Z"
                },
                {
                    "start": "2023-02-10T09:00:00.000Z",
                    "end": "2023-02-10T17:00:00.000Z"
                },
                {
                    "start": "2023-02-11T09:00:00.000Z",
                    "end": "2023-02-11T17:00:00.000Z"
                },
                {
                    "start": "2023-02-12T09:00:00.000Z",
                    "end": "2023-02-12T17:00:00.000Z"
                },
                {
                    "start": "2023-02-15T09:00:00.000Z",
                    "end": "2023-02-15T17:00:00.000Z"
                },
                {
                    "start": "2023-02-16T09:00:00.000Z",
                    "end": "2023-02-16T17:00:00.000Z"
                },
                {
                    "start": "2023-02-17T09:00:00.000Z",
                    "end": "2023-02-17T17:00:00.000Z"
                },
                {
                    "start": "2023-02-18T09:00:00.000Z",
                    "end": "2023-02-18T17:00:00.000Z"
                },
                {
                    "start": "2023-02-19T09:00:00.000Z",
                    "end": "2023-02-19T17:00:00.000Z"
                },
                {
                    "start": "2023-02-22T09:00:00.000Z",
                    "end": "2023-02-22T17:00:00.000Z"
                },
                {
                    "start": "2023-02-23T09:00:00.000Z",
                    "end": "2023-02-23T17:00:00.000Z"
                },
                {
                    "start": "2023-02-24T09:00:00.000Z",
                    "end": "2023-02-24T17:00:00.000Z"
                },
                {
                    "start": "2023-02-25T09:00:00.000Z",
                    "end": "2023-02-25T17:00:00.000Z"
                },
                {
                    "start": "2023-02-26T09:00:00.000Z",
                    "end": "2023-02-26T17:00:00.000Z"
                },
                {
                    "start": "2023-03-01T09:00:00.000Z",
                    "end": "2023-03-01T17:00:00.000Z"
                },
                {
                    "start": "2023-03-02T09:00:00.000Z",
                    "end": "2023-03-02T17:00:00.000Z"
                },
                {
                    "start": "2023-03-03T09:00:00.000Z",
                    "end": "2023-03-03T17:00:00.000Z"
                },
                {
                    "start": "2023-03-04T09:00:00.000Z",
                    "end": "2023-03-04T17:00:00.000Z"
                },
                {
                    "start": "2023-03-05T09:00:00.000Z",
                    "end": "2023-03-05T17:00:00.000Z"
                },
                {
                    "start": "2023-03-08T09:00:00.000Z",
                    "end": "2023-03-08T17:00:00.000Z"
                },
                {
                    "start": "2023-03-09T09:00:00.000Z",
                    "end": "2023-03-09T17:00:00.000Z"
                },
                {
                    "start": "2023-03-10T09:00:00.000Z",
                    "end": "2023-03-10T17:00:00.000Z"
                },
                {
                    "start": "2023-03-11T09:00:00.000Z",
                    "end": "2023-03-11T17:00:00.000Z"
                },
                {
                    "start": "2023-03-12T09:00:00.000Z",
                    "end": "2023-03-12T17:00:00.000Z"
                },
                {
                    "start": "2023-03-15T09:00:00.000Z",
                    "end": "2023-03-15T17:00:00.000Z"
                },
                {
                    "start": "2023-03-16T09:00:00.000Z",
                    "end": "2023-03-16T17:00:00.000Z"
                },
                {
                    "start": "2023-03-17T09:00:00.000Z",
                    "end": "2023-03-17T17:00:00.000Z"
                },
                {
                    "start": "2023-03-18T09:00:00.000Z",
                    "end": "2023-03-18T17:00:00.000Z"
                },
                {
                    "start": "2023-03-19T09:00:00.000Z",
                    "end": "2023-03-19T17:00:00.000Z"
                },
                {
                    "start": "2023-03-22T09:00:00.000Z",
                    "end": "2023-03-22T17:00:00.000Z"
                },
                {
                    "start": "2023-03-23T09:00:00.000Z",
                    "end": "2023-03-23T17:00:00.000Z"
                },
                {
                    "start": "2023-03-24T09:00:00.000Z",
                    "end": "2023-03-24T17:00:00.000Z"
                },
                {
                    "start": "2023-03-25T09:00:00.000Z",
                    "end": "2023-03-25T17:00:00.000Z"
                },
                {
                    "start": "2023-03-26T08:00:00.000Z",
                    "end": "2023-03-26T16:00:00.000Z"
                },
                {
                    "start": "2023-03-29T08:00:00.000Z",
                    "end": "2023-03-29T16:00:00.000Z"
                },
                {
                    "start": "2023-03-30T08:00:00.000Z",
                    "end": "2023-03-30T16:00:00.000Z"
                },
                {
                    "start": "2023-03-31T08:00:00.000Z",
                    "end": "2023-03-31T16:00:00.000Z"
                },
                {
                    "start": "2023-04-01T08:00:00.000Z",
                    "end": "2023-04-01T16:00:00.000Z"
                },
                {
                    "start": "2023-04-02T08:00:00.000Z",
                    "end": "2023-04-02T16:00:00.000Z"
                },
                {
                    "start": "2023-04-05T08:00:00.000Z",
                    "end": "2023-04-05T16:00:00.000Z"
                },
                {
                    "start": "2023-04-06T08:00:00.000Z",
                    "end": "2023-04-06T16:00:00.000Z"
                },
                {
                    "start": "2023-04-07T08:00:00.000Z",
                    "end": "2023-04-07T16:00:00.000Z"
                },
                {
                    "start": "2023-04-08T08:00:00.000Z",
                    "end": "2023-04-08T16:00:00.000Z"
                },
                {
                    "start": "2023-04-09T08:00:00.000Z",
                    "end": "2023-04-09T16:00:00.000Z"
                },
                {
                    "start": "2023-04-12T08:00:00.000Z",
                    "end": "2023-04-12T16:00:00.000Z"
                },
                {
                    "start": "2023-04-13T08:00:00.000Z",
                    "end": "2023-04-13T16:00:00.000Z"
                },
                {
                    "start": "2023-04-14T08:00:00.000Z",
                    "end": "2023-04-14T16:00:00.000Z"
                },
                {
                    "start": "2023-04-15T08:00:00.000Z",
                    "end": "2023-04-15T16:00:00.000Z"
                },
                {
                    "start": "2023-04-16T08:00:00.000Z",
                    "end": "2023-04-16T16:00:00.000Z"
                },
                {
                    "start": "2023-04-19T08:00:00.000Z",
                    "end": "2023-04-19T16:00:00.000Z"
                },
                {
                    "start": "2023-04-20T08:00:00.000Z",
                    "end": "2023-04-20T16:00:00.000Z"
                },
                {
                    "start": "2023-04-21T08:00:00.000Z",
                    "end": "2023-04-21T16:00:00.000Z"
                },
                {
                    "start": "2023-04-22T08:00:00.000Z",
                    "end": "2023-04-22T16:00:00.000Z"
                },
                {
                    "start": "2023-04-23T08:00:00.000Z",
                    "end": "2023-04-23T16:00:00.000Z"
                },
                {
                    "start": "2023-04-26T08:00:00.000Z",
                    "end": "2023-04-26T16:00:00.000Z"
                },
                {
                    "start": "2023-04-27T08:00:00.000Z",
                    "end": "2023-04-27T16:00:00.000Z"
                },
                {
                    "start": "2023-04-28T08:00:00.000Z",
                    "end": "2023-04-28T16:00:00.000Z"
                },
                {
                    "start": "2023-04-29T08:00:00.000Z",
                    "end": "2023-04-29T16:00:00.000Z"
                },
                {
                    "start": "2023-04-30T08:00:00.000Z",
                    "end": "2023-04-30T16:00:00.000Z"
                },
                {
                    "start": "2023-05-01T08:00:00.000Z",
                    "end": "2023-05-01T16:00:00.000Z"
                }
            ],
            "registration": [
                {
                    "value": "https://www.luma.org/shop/details.html?product=60bf345cc370236ae98135e8",
                    "type": "link",
                    "prefix": ""
                }
            ],
            "firstDate": "2022-09-23",
            "firstTimeStart": "10:00",
            "firstTimeEnd": "18:00",
            "lastDate": "2023-05-01",
            "lastTimeStart": "10:00",
            "lastTimeEnd": "18:00",
            "permalink": "https://openagenda.com/agendas/99501607/events/2613221",
            "featured": 1,
            "custom": null,
            "contributor": {
                "organization": "LUMA Arles"
            },
            "category": null,
            "tags": [
                {
                    "label": "Evénement accessible gratuitement à tous",
                    "slug": "evenement-accessible-gratuitement-a-tous",
                    "id": 61767,
                    "schemaOptionId": "10428.255"
                },
                {
                    "label": "Culture",
                    "slug": "culture",
                    "id": 61074,
                    "schemaOptionId": "10428.233"
                },
                {
                    "label": "Musée",
                    "slug": "musee",
                    "id": 61078,
                    "schemaOptionId": "10428.237"
                },
                {
                    "label": "Exposition",
                    "slug": "exposition",
                    "id": 61064,
                    "schemaOptionId": "10428.243"
                },
                {
                    "label": "Conférence",
                    "slug": "conference",
                    "id": 61065,
                    "schemaOptionId": "10428.244"
                }
            ],
            "tagGroups": [
                {
                    "name": "Gratuit",
                    "access": "public",
                    "slug": "gratuit",
                    "tags": [
                        {
                            "label": "Evénement accessible gratuitement à tous",
                            "slug": "evenement-accessible-gratuitement-a-tous",
                            "id": 61767,
                            "schemaOptionId": "10428.255"
                        }
                    ]
                },
                {
                    "name": "Thématiques",
                    "access": "public",
                    "slug": "thematiques",
                    "tags": [
                        {
                            "label": "Culture",
                            "slug": "culture",
                            "id": 61074,
                            "schemaOptionId": "10428.233"
                        },
                        {
                            "label": "Musée",
                            "slug": "musee",
                            "id": 61078,
                            "schemaOptionId": "10428.237"
                        }
                    ]
                },
                {
                    "name": "Types d'événements",
                    "access": "public",
                    "slug": "types-devenements",
                    "tags": [
                        {
                            "label": "Exposition",
                            "slug": "exposition",
                            "id": 61064,
                            "schemaOptionId": "10428.243"
                        },
                        {
                            "label": "Conférence",
                            "slug": "conference",
                            "id": 61065,
                            "schemaOptionId": "10428.244"
                        }
                    ]
                }
            ],
            "linkedEvents": []
        },
 */
const DaySquares = styled.button`
position: relative;
width: 100%;
height: 100%;
background-color: #FFE3C6;
background: radial-gradient(circle, rgb(255, 227, 198), rgb(249 195 155));
display: flex;
align-items: center;
align-content: center;
justify-content: center;
border: 0px rgb(243 168 113);
outline: none;
cursor: pointer;

&:hover{
    background: radial-gradient(circle, rgb(255, 227, 198), rgb(249 195 155));
    border: 3px solid rgb(243 168 113);
    transition: all 0.1s ease-in-out;
}
.DayNum{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    color: rgb(104 68 41);

}
.EventNum{
    padding: 0;
    margin: 0;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    background-color: ${props=>props.numberOfEvents !== 0 ? "rgb(243 168 113)" : "transparent"};
    &:hover{
        background-color: rgb(243 168 113);
        transition: all 0.2s ease-in-out;
    }

}

`;
const DaySquaresUnusable = styled.div`
width: 100%;
height: 100%;
//background-color: gray;
display: flex;
align-items: center;
align-content: center;

background: radial-gradient(circle, rgb(211 149 105), rgb(157 100 57));
background-blend-mode: darken;
justify-content: center;
//background: rgb(104 68 41);


`;
const ColumnBack = styled.div`
    position: absolute;
    width: 10%;
    height: 94%;
    left: 88%;
    z-index: 1;
    background-image: url(${CulumnImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    filter: drop-shadow( 10px 10px 10px rgba(0,0,0,0.5) );
    

`;
const ColumnBack2 = styled.div`
    position: absolute;
    width: 10%;
    height: 94%;
    left: 2%;
    z-index: 1;
    background-image: url(${CulumnImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    filter: drop-shadow( -10px 10px 10px rgba(0,0,0,0.5) );
    
    

`;
const ArrowSelector = styled.button`

z-index: 1;
font-size: ${props=>props.scale.x}px;
transform: scale(1,4);
border: 0px;
outline: none;
cursor: pointer;
background-color: transparent;
color: aliceblue;
text-shadow: 0px 0px 2px black;


&:hover{
    transform: scale(1.1,4.4);
    transition: all 0.2s ease-in-out;
    text-shadow: 0px 0px 10px rgb(255 255 255);
}
`;
function Arrows(props){
    let scale = props.scale;
    let direction = props.direction;


    return (
        <>
            
            <ArrowSelector scale={scale} onClick={props.onClicks} className={props.className} >
                {
                    direction === "right" ? "〉" : '〈' 
                }
            </ArrowSelector>
        </>
        )
}
function DaySquare(props){

    return (
        props.isActive ?
        <DaySquares numberOfEvents={props.numberOfEvents} onClick={props.onClicks} >
            <h1 className="DayNum">{props.number}</h1>
            <h1 className="EventNum">{props.numberOfEvents !== 0 ? props.numberOfEvents : "" }</h1>
        </DaySquares>
        :
        <DaySquaresUnusable>
            <h1></h1>
        </DaySquaresUnusable>
    )
}
//===================================================================================================
let widthOfCalender = "90%";
const CalenderBody = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
align-content: center;
justify-content: center;

.CalenderHeader{
    width: ${widthOfCalender};
    height: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    background-color: rgb(243 168 113);
    background-image: url(${Background3});
    border-bottom: 1px solid #e0e0e0;
    h1{
        padding: 0;
        margin: 0;
        width: 230px;
        text-align: center;
        background-color: wheat;
    }
}

.CalenderBody{
    width: ${widthOfCalender};
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;

    .Header{
        width: 100%;
        height: 10%;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        
    }

    .Body{
        width: 100%;
        height: 800px;
        display: flex;
        flex-direction: row;
        background-color: rgb(253 181 131);
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;

        .CalenderBodyMonth{
            position: relative;
            width: 90%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: center;
            .CalenderBodyDays{
                width: 95%;
                height: 10%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                align-content: center;
                .CalenderBodyDaysName{
                    padding: 0;
                    margin: 0;
                }

            }

            .CalenderBodyDaySquare{
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(6, 1fr);
                grid-gap: 1px;
                background-color: #fff;
                border: 1px solid #e0e0e0;
            }



        }
        .leftArrows, .RightArrows{
            display:   flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;


        }
    }
}
`;

export function CalenderView(props){


    const [days, setDays] = useState(Array(42).fill(true));
    let date = props.getDate;
    let linkedDatesToEvents = {};
    const [isLoading, setIsLoading] = useState(true);
    const allTimings = Data.events.map((event)=>event.timings.map((timing)=>{
        return {date:DateTime.fromISO(timing.start), uid:event.uid}
    })).flat();
    function handleDateChange(newDate)
    {
        props.setDate(newDate);
        if(linkedDatesToEvents[newDate.day] !== undefined){
            props.setSelectedEvents(linkedDatesToEvents[newDate.day]);
        }
    }

    let daysInMonth = DateTime.local(date.year, date.month).daysInMonth;
    let firstDayOfMonth = DateTime.local(date.year, date.month, 1).weekday;

    useEffect(() => {
        let days = Array(42).fill(false);
        for (let i = 0; i < daysInMonth; i++) {
            days[firstDayOfMonth + i] = true;
        }
        setDays(days);
        //sort allTimings
        /*allTimings.sort((a,b)=>{
            let dateA = DateTime.fromISO(a.start);
            let dateB = DateTime.fromISO(b.start);
            return dateA - dateB;
        }
        );*/
        //sort allTimings
        allTimings.sort((a,b)=>{
            let dateA = a.date;
            let dateB = b.date;
            return dateA - dateB;
        }
        );

    }, [date]);


    function hasEvents(day){
        let numberOfEvents = 0;
        let dayNumber = day;
        let currentDate = DateTime.local(date.year,date.month,dayNumber);
        allTimings.map((existingObj)=>{
            if(existingObj.date.day === currentDate.day && existingObj.date.month === currentDate.month && existingObj.date.year === currentDate.year)
            {
                if(linkedDatesToEvents[dayNumber] === undefined)
                {
                    linkedDatesToEvents[dayNumber] = [];
                }
                if(linkedDatesToEvents[dayNumber].indexOf(existingObj.uid) === -1)
                {
                    linkedDatesToEvents[dayNumber].push(existingObj.uid);
                    numberOfEvents++;
                }
            }
        });

        return numberOfEvents;

    }
   
    return (
        <>
            <CalenderBody>
                <ColumnBack>
                </ColumnBack>

                <ColumnBack2>
                </ColumnBack2>
                <div className="CalenderHeader">
                   
                    <h1>{date.year.toString()}</h1>
                    <h1>{DateTime.local(date.year,date.month).monthLong}</h1>

                </div>
                <div className="CalenderBody">
                    <div className="Header">
 
                    </div>
                    <div className="Body">
                        <div className="leftArrows">
                            <Arrows onClicks={
                            ()=>{
                                handleDateChange({
                                    year: date.year - 1,
                                    month: date.month,
                                    day: date.day
                                })
                            }
                            
                        } direction="left" scale={{x:150,y:90}} className="CalenderBodyYearArrow"></Arrows>
                            <Arrows onClicks={
                                ()=>{
                                    if(date.month === 1){
                                        handleDateChange({
                                            year: date.year - 1,
                                            month: 12,
                                            day: date.day
                                        })
                                    }
                                    else{

                                    handleDateChange({
                                        year: date.year,
                                        month: date.month - 1,
                                        day: date.day
                                    })}
                                }

                            } className="CalenderBodyMonthArrow" scale={{x:80,y:70}} direction="left"></Arrows>
                        </div>
                       
                        <div className="CalenderBodyMonth">
                            <div className="CalenderBodyDays">
                                <div className="CalenderBodyDaysName">Sun</div>
                                <div className="CalenderBodyDaysName">Mon</div>
                                <div className="CalenderBodyDaysName">Tue</div>
                                <div className="CalenderBodyDaysName">Wed</div>
                                <div className="CalenderBodyDaysName">Thu</div>
                                <div className="CalenderBodyDaysName">Fri</div>
                                <div className="CalenderBodyDaysName">Sat</div>
                            </div>

                            <div className="CalenderBodyDaySquare">
                                {
                                    days.map((day, index) => {
                                        let dayNumber = index - (firstDayOfMonth - 1);
                                        let numberOfEvents = hasEvents(dayNumber);
                                        
                                        return (<DaySquare onClicks={
                                            ()=>{
                                                    handleDateChange({
                                                        year: date.year,
                                                        month: date.month,
                                                        day: dayNumber
                                                    })
                                            }
                                        } isActive={day} numberOfEvents={numberOfEvents} number={day ? index - (firstDayOfMonth - 1 ) : "NO"} key={index} />)

                                        
                                    })
                                    
                                }
                            
                            
                            </div>
                        </div>
                        <div className="RightArrows">
                        <Arrows onClicks={()=>{
                                setIsLoading(true);
                                if(date.month === 12){
                                    handleDateChange({
                                        year: date.year + 1,
                                        month: 1,
                                        day: date.day
                                    })
                                }
                                else{
                                    handleDateChange({
                                        year: date.year,
                                        month: date.month + 1,
                                        day: date.day
                                    })
                                }
                            
                            }} className="CalenderBodyMonthArrow" scale={{x:80,y:70}} direction="right"></Arrows>

                        <Arrows onClicks={
                            ()=>{
                                handleDateChange({
                                    year: date.year + 1,
                                    month: date.month,
                                    day: date.day
                                })
                            }

                        } direction="right" scale={{x:150,y:90}} className="CalenderBodyYearArrow"></Arrows>
                        </div>

                    </div>
                    
                </div>
            </CalenderBody>
        </>
    )
}

export default CalenderView;