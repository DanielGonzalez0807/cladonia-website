-- =====================================================
-- LIMPIEZA Y CREACIÓN COMPLETA
-- =====================================================

-- PASO 1: ELIMINAR TABLAS EXISTENTES
DROP TABLE IF EXISTS reservas_opciones_dinamicas CASCADE;

DROP TABLE IF EXISTS reservas_plan_dinamico CASCADE;

DROP TABLE IF EXISTS reservas_plan_top CASCADE;

DROP TABLE IF EXISTS reservas_plan_basico CASCADE;

DROP TABLE IF EXISTS reservas CASCADE;

DROP TABLE IF EXISTS opciones_dinamicas CASCADE;

DROP TABLE IF EXISTS fechas_programadas_top CASCADE;

DROP TABLE IF EXISTS tarifas_guias CASCADE;

DROP TABLE IF EXISTS tarifas_basicas CASCADE;

DROP TABLE IF EXISTS precios_senderos CASCADE;

DROP TABLE IF EXISTS planes CASCADE;

DROP TABLE IF EXISTS senderos CASCADE;

-- PASO 2: CREAR TABLAS
CREATE TABLE senderos (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    distancia TEXT,
    dificultad TEXT,
    elevacion TEXT,
    inclinacion TEXT,
    imagen TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

CREATE TABLE planes (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    subtitulo TEXT,
    descripcion TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

CREATE TABLE precios_senderos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sendero_id TEXT REFERENCES senderos (id) ON DELETE CASCADE,
    plan_id TEXT REFERENCES planes (id) ON DELETE CASCADE,
    precio INTEGER NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (sendero_id, plan_id)
);

CREATE TABLE tarifas_basicas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sendero_id TEXT REFERENCES senderos (id) ON DELETE CASCADE,
    tarifa_estudiantes INTEGER NOT NULL,
    tarifa_adultos INTEGER NOT NULL,
    tarifa_exentos INTEGER NOT NULL,
    tarifa_extranjeros INTEGER NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (sendero_id)
);

CREATE TABLE tarifas_guias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sendero_id TEXT REFERENCES senderos (id) ON DELETE CASCADE,
    tarifa INTEGER NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (sendero_id)
);

CREATE TABLE fechas_programadas_top (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sendero_id TEXT REFERENCES senderos (id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    cupos_totales INTEGER NOT NULL,
    cupos_disponibles INTEGER NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (sendero_id, fecha)
);

CREATE TABLE opciones_dinamicas (
    id TEXT PRIMARY KEY,
    categoria TEXT NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio INTEGER NOT NULL,
    precio_por_persona BOOLEAN DEFAULT true,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

CREATE TABLE reservas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT NOT NULL,
    destino TEXT NOT NULL,
    sendero_id TEXT REFERENCES senderos (id),
    plan_id TEXT REFERENCES planes (id),
    fecha DATE NOT NULL,
    estudiantes INTEGER DEFAULT 0,
    adultos INTEGER DEFAULT 0,
    exentos INTEGER DEFAULT 0,
    extranjeros INTEGER DEFAULT 0,
    total_personas INTEGER NOT NULL,
    total_precio INTEGER NOT NULL,
    observaciones TEXT,
    estado TEXT DEFAULT 'pendiente',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

CREATE TABLE reservas_plan_basico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    reserva_id UUID REFERENCES reservas (id) ON DELETE CASCADE,
    automoviles INTEGER DEFAULT 0,
    microbuses INTEGER DEFAULT 0,
    buses INTEGER DEFAULT 0,
    costo_entradas INTEGER NOT NULL,
    costo_polizas INTEGER NOT NULL,
    costo_guia INTEGER NOT NULL,
    costo_vehiculos INTEGER NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

CREATE TABLE reservas_plan_top (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    reserva_id UUID REFERENCES reservas (id) ON DELETE CASCADE,
    fecha_programada_id UUID REFERENCES fechas_programadas_top (id),
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

CREATE TABLE reservas_plan_dinamico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    reserva_id UUID REFERENCES reservas (id) ON DELETE CASCADE,
    precio_base INTEGER NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

CREATE TABLE reservas_opciones_dinamicas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    reserva_dinamico_id UUID REFERENCES reservas_plan_dinamico (id) ON DELETE CASCADE,
    opcion_id TEXT REFERENCES opciones_dinamicas (id),
    cantidad INTEGER DEFAULT 1,
    precio_unitario INTEGER NOT NULL,
    precio_total INTEGER NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- PASO 3: CREAR ÍNDICES
CREATE INDEX idx_reservas_email ON reservas (email);

CREATE INDEX idx_reservas_fecha ON reservas (fecha);

CREATE INDEX idx_reservas_estado ON reservas (estado);

CREATE INDEX idx_reservas_sendero ON reservas (sendero_id);

CREATE INDEX idx_reservas_plan ON reservas (plan_id);

CREATE INDEX idx_fechas_programadas_sendero ON fechas_programadas_top (sendero_id);

CREATE INDEX idx_fechas_programadas_fecha ON fechas_programadas_top (fecha);

-- PASO 4: INSERTAR DATOS
INSERT INTO
    senderos (
        id,
        nombre,
        distancia,
        dificultad,
        elevacion,
        inclinacion,
        imagen
    )
VALUES (
        'sendero_1',
        'Lagunas de Siecha',
        '14 km',
        'Moderada',
        '600 m',
        '8%',
        '/images/trails/siecha.jpg'
    ),
    (
        'sendero_2',
        'Laguna Seca',
        '8 km',
        'Fácil',
        '300 m',
        '5%',
        '/images/trails/seca.jpg'
    ),
    (
        'sendero_3',
        'Suasie',
        '18 km',
        'Difícil',
        '800 m',
        '12%',
        '/images/trails/suasie.jpg'
    ),
    (
        'sendero_4',
        'Cuchillas de Siecha',
        '12 km',
        'Moderada',
        '500 m',
        '7%',
        '/images/trails/cuchillas.jpg'
    ),
    (
        'sendero_5',
        'Lagunas de Buitrago',
        '16 km',
        'Difícil',
        '700 m',
        '10%',
        '/images/trails/buitrago.jpg'
    ),
    (
        'sendero_6',
        'Sendero Interpretativo',
        '5 km',
        'Fácil',
        '200 m',
        '3%',
        '/images/trails/interpretativo.jpg'
    ),
    (
        'sendero_7',
        'Páramo de Chingaza',
        '20 km',
        'Muy Difícil',
        '1000 m',
        '15%',
        '/images/trails/paramo.jpg'
    );

INSERT INTO
    planes (id, nombre, subtitulo)
VALUES (
        'basic',
        'Plan Básico',
        'Lo esencial para explorar'
    ),
    (
        'top',
        'Plan Top',
        'Todo incluido, inmersión total'
    ),
    (
        'dynamic',
        'Plan Dinámico',
        'Adaptado a tus necesidades'
    );

INSERT INTO
    precios_senderos (sendero_id, plan_id, precio)
VALUES ('sendero_1', 'basic', 80000),
    ('sendero_1', 'top', 200000),
    (
        'sendero_1',
        'dynamic',
        120000
    ),
    ('sendero_2', 'basic', 60000),
    ('sendero_2', 'top', 180000),
    (
        'sendero_2',
        'dynamic',
        100000
    ),
    ('sendero_3', 'basic', 100000),
    ('sendero_3', 'top', 250000),
    (
        'sendero_3',
        'dynamic',
        150000
    ),
    ('sendero_4', 'basic', 75000),
    ('sendero_4', 'top', 190000),
    (
        'sendero_4',
        'dynamic',
        110000
    ),
    ('sendero_5', 'basic', 90000),
    ('sendero_5', 'top', 220000),
    (
        'sendero_5',
        'dynamic',
        140000
    ),
    ('sendero_6', 'basic', 50000),
    ('sendero_6', 'top', 150000),
    ('sendero_6', 'dynamic', 80000),
    ('sendero_7', 'basic', 120000),
    ('sendero_7', 'top', 280000),
    (
        'sendero_7',
        'dynamic',
        180000
    );

INSERT INTO
    tarifas_basicas (
        sendero_id,
        tarifa_estudiantes,
        tarifa_adultos,
        tarifa_exentos,
        tarifa_extranjeros
    )
VALUES (
        'sendero_1',
        24500,
        29000,
        0,
        78500
    ),
    (
        'sendero_2',
        24500,
        29000,
        0,
        78500
    ),
    (
        'sendero_3',
        24500,
        29000,
        0,
        78500
    ),
    (
        'sendero_4',
        24500,
        29000,
        0,
        78500
    ),
    (
        'sendero_5',
        24500,
        29000,
        0,
        78500
    ),
    (
        'sendero_6',
        24500,
        29000,
        0,
        78500
    ),
    (
        'sendero_7',
        24500,
        29000,
        0,
        78500
    );

INSERT INTO
    tarifas_guias (sendero_id, tarifa)
VALUES ('sendero_1', 150000),
    ('sendero_2', 180000),
    ('sendero_3', 220000),
    ('sendero_4', 170000),
    ('sendero_5', 200000),
    ('sendero_6', 140000),
    ('sendero_7', 250000);

INSERT INTO
    fechas_programadas_top (
        sendero_id,
        fecha,
        cupos_totales,
        cupos_disponibles
    )
VALUES (
        'sendero_1',
        '2026-01-10',
        15,
        15
    ),
    (
        'sendero_1',
        '2026-02-14',
        15,
        15
    ),
    (
        'sendero_1',
        '2026-03-21',
        15,
        15
    ),
    (
        'sendero_2',
        '2026-01-11',
        20,
        20
    ),
    (
        'sendero_2',
        '2026-02-15',
        20,
        20
    ),
    (
        'sendero_2',
        '2026-03-22',
        20,
        20
    ),
    (
        'sendero_3',
        '2026-01-17',
        12,
        12
    ),
    (
        'sendero_3',
        '2026-02-21',
        12,
        12
    ),
    (
        'sendero_3',
        '2026-03-28',
        12,
        12
    ),
    (
        'sendero_4',
        '2026-01-18',
        18,
        18
    ),
    (
        'sendero_4',
        '2026-02-22',
        18,
        18
    ),
    (
        'sendero_4',
        '2026-03-29',
        18,
        18
    ),
    (
        'sendero_5',
        '2026-01-24',
        15,
        15
    ),
    (
        'sendero_5',
        '2026-02-28',
        15,
        15
    ),
    (
        'sendero_5',
        '2026-03-28',
        15,
        15
    ),
    (
        'sendero_6',
        '2026-01-25',
        25,
        25
    ),
    (
        'sendero_6',
        '2026-02-22',
        25,
        25
    ),
    (
        'sendero_6',
        '2026-03-29',
        25,
        25
    ),
    (
        'sendero_7',
        '2026-01-31',
        10,
        10
    ),
    (
        'sendero_7',
        '2026-02-28',
        10,
        10
    ),
    (
        'sendero_7',
        '2026-03-28',
        10,
        10
    );

INSERT INTO
    opciones_dinamicas (
        id,
        categoria,
        nombre,
        descripcion,
        precio,
        precio_por_persona
    )
VALUES (
        'transport',
        'transport',
        'Transporte',
        'Transporte ida y vuelta al parque',
        50000,
        true
    ),
    (
        'breakfast',
        'meal',
        'Desayuno',
        'Desayuno completo',
        15000,
        true
    ),
    (
        'snack',
        'meal',
        'Refrigerio',
        'Refrigerio ligero',
        8000,
        true
    ),
    (
        'lunch',
        'meal',
        'Almuerzo',
        'Almuerzo completo',
        25000,
        true
    ),
    (
        'photography',
        'guide',
        'Guía Experto en Fotografía',
        'Especialista en fotografía de naturaleza',
        100000,
        false
    ),
    (
        'biology',
        'guide',
        'Guía Experto en Biología',
        'Biólogo especializado en fauna y flora',
        120000,
        false
    ),
    (
        'bilingual',
        'guide',
        'Guía Bilingüe',
        'Guía con dominio de inglés',
        150000,
        false
    );