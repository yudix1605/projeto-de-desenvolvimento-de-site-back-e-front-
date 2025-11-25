from extensions import db
from models.user import User
from flask import jsonify, request

def calcular_imc(user_id, data):
    """Calcula e salva o IMC do usuário"""
    if not data or not all(key in data for key in ["peso", "altura"]):
        return jsonify({"error": "Campos 'peso' e 'altura' são obrigatórios."}), 400
    
    try:
        peso = float(data["peso"])
        altura = float(data["altura"])
        
        if peso <= 0 or altura <= 0:
            return jsonify({"error": "Peso e altura devem ser valores positivos."}), 400
            
    except ValueError:
        return jsonify({"error": "Peso e altura devem ser números válidos."}), 400
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404
    
    user.peso = peso
    user.altura = altura
    db.session.commit()
    
    imc = user.calcular_imc()
    classificacao = user.classificar_imc()
    
    return jsonify({
        "imc": imc,
        "classificacao": classificacao,
        "peso": peso,
        "altura": altura,
        "message": "IMC calculado com sucesso!"
    }), 200

def obter_imc(user_id):
    """Obtém o IMC atual do usuário"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404
    
    imc = user.calcular_imc()
    classificacao = user.classificar_imc()
    
    return jsonify({
        "imc": imc,
        "classificacao": classificacao,
        "peso": user.peso,
        "altura": user.altura
    }), 200

def sugerir_dieta(user_id):
    """Sugere uma dieta baseada no IMC do usuário"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404
    
    imc = user.calcular_imc()
    if not imc:
        return jsonify({"error": "Calcule o IMC primeiro para obter sugestões de dieta."}), 400
    
    classificacao = user.classificar_imc()
    
    # Sugestões de dieta baseadas na classificação do IMC
    dietas = {
        "Abaixo do peso": {
            "nome": "Dieta para Ganho de Massa",
            "objetivo": "Aumentar massa muscular e peso de forma saudável",
            "calorias_diarias": f"Aproximadamente {int(user.peso * 40)} calorias",
            "distribuicao": "30% proteínas, 40% carboidratos, 30% gorduras",
            "recomendacoes": [
                "Consuma proteínas em todas as refeições",
                "Inclua carboidratos complexos",
                "Fracione as refeições (6-8 refeições por dia)",
                "Beba bastante água",
                "Pratique exercícios de força"
            ],
            "alimentos_sugeridos": [
                "Frango, peixe, ovos",
                "Arroz integral, batata doce, aveia",
                "Abacate, azeite de oliva, castanhas",
                "Frutas secas, whey protein"
            ]
        },
        "Peso normal": {
            "nome": "Dieta de Manutenção",
            "objetivo": "Manter o peso atual e saúde",
            "calorias_diarias": f"Aproximadamente {int(user.peso * 35)} calorias",
            "distribuicao": "25% proteínas, 45% carboidratos, 30% gorduras",
            "recomendacoes": [
                "Mantenha uma alimentação balanceada",
                "Consuma frutas e vegetais variados",
                "Hidrate-se adequadamente",
                "Pratique atividades físicas regularmente",
                "Evite alimentos ultraprocessados"
            ],
            "alimentos_sugeridos": [
                "Proteínas magras",
                "Grãos integrais",
                "Frutas e vegetais coloridos",
                "Gorduras saudáveis"
            ]
        },
        "Sobrepeso": {
            "nome": "Dieta para Perda de Peso",
            "objetivo": "Perda de peso gradual e saudável",
            "calorias_diarias": f"Aproximadamente {int(user.peso * 30)} calorias",
            "distribuicao": "30% proteínas, 40% carboidratos, 30% gorduras",
            "recomendacoes": [
                "Déficit calórico moderado",
                "Aumente o consumo de fibras",
                "Reduza açúcares e gorduras saturadas",
                "Pratique exercícios aeróbicos",
                "Mantenha-se hidratado"
            ],
            "alimentos_sugeridos": [
                "Vegetais folhosos",
                "Proteínas magras",
                "Grãos integrais",
                "Frutas com baixo índice glicêmico"
            ]
        },
        "Obesidade Grau I": {
            "nome": "Dieta para Redução de Peso",
            "objetivo": "Redução significativa de peso",
            "calorias_diarias": f"Aproximadamente {int(user.peso * 25)} calorias",
            "distribuicao": "35% proteínas, 35% carboidratos, 30% gorduras",
            "recomendacoes": [
                "Déficit calórico controlado",
                "Acompanhamento médico recomendado",
                "Exercícios de baixo impacto",
                "Alimentos com baixa densidade calórica",
                "Evite alimentos processados"
            ],
            "alimentos_sugeridos": [
                "Vegetais crus e cozidos",
                "Proteínas magras",
                "Gorduras saudáveis",
                "Chás e água"
            ]
        },
        "Obesidade Grau II": {
            "nome": "Dieta Controlada",
            "objetivo": "Redução de peso com supervisão",
            "calorias_diarias": "Consulte um nutricionista",
            "distribuicao": "Consulte um nutricionista",
            "recomendacoes": [
                "Acompanhamento médico obrigatório",
                "Exercícios supervisionados",
                "Alimentação balanceada e controlada",
                "Evite completamente alimentos processados",
                "Foco em saúde metabólica"
            ],
            "alimentos_sugeridos": [
                "Vegetais variados",
                "Proteínas magras",
                "Gorduras saudáveis em moderação",
                "Água e chás sem açúcar"
            ]
        },
        "Obesidade Grau III": {
            "nome": "Dieta com Supervisão Médica",
            "objetivo": "Tratamento médico especializado",
            "calorias_diarias": "Definida por profissional",
            "distribuicao": "Definida por profissional",
            "recomendacoes": [
                "Acompanhamento médico essencial",
                "Exercícios somente com supervisão",
                "Plano alimentar individualizado",
                "Tratamento multidisciplinar",
                "Foco em melhorar comorbidades"
            ],
            "alimentos_sugeridos": [
                "Orientação profissional específica"
            ]
        }
    }
    
    dieta = dietas.get(classificacao, dietas["Peso normal"])
    
    return jsonify({
        "imc": imc,
        "classificacao": classificacao,
        "dieta": dieta,
        "message": f"Dieta sugerida para: {classificacao}"
    }), 200

def listar_dietas_gerais():
    """Lista dietas gerais para diferentes objetivos"""
    dietas_gerais = {
        "mediterranea": {
            "nome": "Dieta Mediterrânea",
            "descricao": "Baseada nos hábitos alimentares dos países mediterrâneos",
            "beneficios": ["Saúde cardiovascular", "Longevidade", "Controle de peso"],
            "alimentos_principais": ["Azeite de oliva", "Peixes", "Frutas", "Vegetais", "Grãos integrais"],
            "alimentos_evitar": ["Alimentos processados", "Açúcar refinado", "Carnes vermelhas em excesso"]
        },
        "low_carb": {
            "nome": "Dieta Low Carb",
            "descricao": "Redução no consumo de carboidratos",
            "beneficios": ["Perda de peso", "Controle glicêmico", "Saciedade"],
            "alimentos_principais": ["Carnes", "Ovos", "Vegetais folhosos", "Abacate", "Oleaginosas"],
            "alimentos_evitar": ["Açúcar", "Grãos", "Amidos", "Frutas com alto teor de açúcar"]
        },
        "vegetariana": {
            "nome": "Dieta Vegetariana",
            "descricao": "Exclusão de carnes, focando em vegetais",
            "beneficios": ["Saúde cardiovascular", "Consciente ambiental", "Rica em fibras"],
            "alimentos_principais": ["Legumes", "Frutas", "Grãos", "Leguminosas", "Oleaginosas"],
            "alimentos_evitar": ["Todas as carnes", "Peixes", "Frutos do mar"]
        },
        "flexivel": {
            "nome": "Dieta Flexível (IIFYM)",
            "descricao": "Acompanhamento de macronutrientes com flexibilidade",
            "beneficios": ["Flexibilidade", "Consciência nutricional", "Sustentabilidade"],
            "alimentos_principais": ["Variedade de alimentos", "Proteínas magras", "Carboidratos complexos"],
            "alimentos_evitar": ["Excesso de alimentos processados"]
        }
    }
    
    return jsonify({
        "dietas": dietas_gerais,
        "message": "Dietas gerais disponíveis"
    }), 200